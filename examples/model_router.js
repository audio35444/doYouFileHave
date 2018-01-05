import React from "react";
import { Switch, Route } from "react-router-dom";
import ProjectIndex from "../screens/Project/ProjectIndex";
import ProjectCRU from "../screens/Project/ProjectCRU";import DatabaseIndex from "../screens/Database/DatabaseIndex";
import DatabaseCRU from "../screens/Database/DatabaseCRU";import TemplateIndex from "../screens/Template/TemplateIndex";
import TemplateCRU from "../screens/Template/TemplateCRU";import ProjectTypeIndex from "../screens/ProjectType/ProjectTypeIndex";
import ProjectTypeCRU from "../screens/ProjectType/ProjectTypeCRU";import TemplateTablesIndex from "../screens/TemplateTables/TemplateTablesIndex";
import TemplateTablesCRU from "../screens/TemplateTables/TemplateTablesCRU";
import Login from "../screens/login/LoginIndex";
//import Register from "../screens/login/Register";
import Home from "../screens/Home";
import UserPermissions from "../screens/userPermissions/UserPermissions";
import RecoverPasswordChange from "../screens/login/RecoverPasswordChange";
import AddPermission from "../screens/userPermissions/AddPermission";
import PasswordRecovery from "../screens/login/PasswordRecovery";
import {
	LOGIN,
	PASSWORD_RECOVERY,
	ADDPERMISSIONUSER,
	USER,
	REGISTER,
	CONFIRMPASSWORD,
	INDEX,
	PROJECTS,
PROJECTS_NEW,
PROJECTS_EDIT,DATABASES,
DATABASES_NEW,
DATABASES_EDIT,TEMPLATES,
TEMPLATES_NEW,
TEMPLATES_EDIT,PROJECT_TYPES,
PROJECT_TYPES_NEW,
PROJECT_TYPES_EDIT,TEMPLATE_TABLESS,
TEMPLATE_TABLESS_NEW,
TEMPLATE_TABLESS_EDIT,
} from "./RoutesConstants";

const Routes = () => {
	return (
		<Switch>
			<Route path={PROJECTS_NEW} component={ProjectCRU} />
			<Route path={PROJECTS_EDIT} component={ProjectCRU} />
			<Route path={PROJECTS} component={ProjectIndex} />
			<Route path={DATABASES_NEW} component={DatabaseCRU} />
			<Route path={DATABASES_EDIT} component={DatabaseCRU} />
			<Route path={DATABASES} component={DatabaseIndex} />
			<Route path={TEMPLATES_NEW} component={TemplateCRU} />
			<Route path={TEMPLATES_EDIT} component={TemplateCRU} />
			<Route path={TEMPLATES} component={TemplateIndex} />
			<Route path={PROJECT_TYPES_NEW} component={ProjectTypeCRU} />
			<Route path={PROJECT_TYPES_EDIT} component={ProjectTypeCRU} />
			<Route path={PROJECT_TYPES} component={ProjectTypeIndex} />
			<Route path={TEMPLATE_TABLESS_NEW} component={TemplateTablesCRU} />
			<Route path={TEMPLATE_TABLESS_EDIT} component={TemplateTablesCRU} />
			<Route path={TEMPLATE_TABLESS} component={TemplateTablesIndex} />
			<Route path={ADDPERMISSIONUSER} component={AddPermission} />
			<Route path={CONFIRMPASSWORD} component={RecoverPasswordChange} />
			<Route path={USER} component={UserPermissions} />
			<Route path={PASSWORD_RECOVERY} component={PasswordRecovery} />
			<Route path={LOGIN} component={Login} />
			<Route path={INDEX} component={Home} />
		</Switch>
	);
};

export default Routes;
