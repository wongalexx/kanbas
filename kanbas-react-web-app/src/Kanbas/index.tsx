import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import ProtectedCoursesRoute from "./Courses/ProtectedCoursesRoute";
import Session from "./Account/Session";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentClient from "./Enrollments/client";
export default function Kanbas() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });
  const addNewCourse = async () => {
    try {
      // Create the new course
      const newCourse = await courseClient.createCourse(course);

      // Fetch updated enrollments for the current user
      const updatedEnrollments = await enrollmentClient.fetchEnrollments();
      setEnrollments(updatedEnrollments);

      if (enrolling) {
        // If in "My Courses" view, update only enrolled courses
        const enrolledCourses = await userClient.findCoursesForUser(
          currentUser._id
        );
        setCourses(enrolledCourses);
      } else {
        // If in "All Courses" view, fetch all courses and update the state
        const allCourses = await courseClient.fetchAllCourses();
        const updatedCourses = allCourses.map((course: any) => {
          if (
            updatedEnrollments.some(
              (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
            )
          ) {
            return { ...course, enrolled: true };
          }
          return course;
        });
        setCourses(updatedCourses);
      }
    } catch (error) {
      console.error("Error creating and enrolling in a new course:", error);
    }
  };

  // const deleteCourse = async (courseId: string) => {
  //   const status = await courseClient.deleteCourse(courseId);
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };

  const deleteCourse = async (courseId: string) => {
    try {
      // Unenroll the current user from the course before deleting
      await userClient.unenrollFromCourse(currentUser._id, courseId);

      // Delete the course
      const status = await courseClient.deleteCourse(courseId);

      // Remove the course from the state
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course?._id !== courseId)
      );
    } catch (error) {
      console.error("Error unenrolling and deleting the course:", error);
    }
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const fetchEnrollments = async () => {
    try {
      const enrollments = await enrollmentClient.fetchEnrollments();
      setEnrollments(enrollments);
    } catch (error) {
      console.error(error);
    }
  };
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const initializeCourses = async () => {
      if (enrolling) {
        // Fetch only enrolled courses
        await findCoursesForUser();
      } else {
        // Fetch all courses
        await fetchCourses();
      }
    };

    if (currentUser) {
      initializeCourses();
      fetchEnrollments();
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    currentUser={currentUser}
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <ProtectedCoursesRoute enrollments={enrollments}>
                    <Courses courses={courses} />
                  </ProtectedCoursesRoute>
                </ProtectedRoute>
              }
            />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
