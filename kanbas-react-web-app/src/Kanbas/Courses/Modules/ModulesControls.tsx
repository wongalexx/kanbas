import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { TiCancel } from "react-icons/ti";
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";
export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
  <div id="wd-modules-controls" className="text-nowrap">
    {currentUser.role === "FACULTY" ? 
      <span>
        <button className="btn btn-lg btn-danger me-1 float-end" id="wd-add-module-btn"
          data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Module
        </button>
        <div className="dropdown d-inline me-1 float-end">
          <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
            type="button" data-bs-toggle="dropdown">
            <GreenCheckmark />
            Publish All</button>
          <ul className="dropdown-menu">
            <li>
              <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
                <GreenCheckmark />
                Publish all modules and items</a>
            </li>
            <li>
              <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
                <GreenCheckmark />
                Publish modules only</a>
            </li>
            <li>
              <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
                <TiCancel className="me-1 position-relative text-secondary fs-5"/>
                Unpublish all modules and items</a>
            </li>
            <li>
              <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
                <TiCancel className="me-1 position-relative text-secondary fs-5"/>
                Unpublish modules only</a>
            </li>
          </ul>
        </div>
        <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end"
          type="button">
          View Progress</button>
      </span>
    : <span></span> }
    <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end"
        type="button">
        Collapse All</button>
    <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
        setModuleName={setModuleName} addModule={addModule} />
  </div>
);}
