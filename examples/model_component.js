import React, { Component } from "react";
import _ from "lodash";
import TextField from "material-ui/TextField";
import { Field, FieldArray } from "redux-form";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Util from "../../common/Util";
import VerticalListFields from "../VerticalListFields/VerticalListFields";
import OptionsTableRowColumn from "../OptionsTableRowColumn/OptionsTableRowColumn";
import { Card, CardTitle, CardMedia, CardText } from "material-ui/Card";
import AddChips from '../SuggestedChips/AddChips';
import SelectCheckList from '../SelectCheckList/SelectCheckList';
import { Checkbox } from "redux-form-material-ui";
import ReactDOM from 'react-dom';
import AddItem from './AddItem';



import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from "material-ui/Table";
const styles = {
	actionButton: {
	margin: 10
	}
};

class AddElement extends Component {
	constructor(props) {
	super(props);

	let elementForRow={};
	for(let i in props.fieldList){
	if(!elementForRow[props.fieldList[i].row])elementForRow[props.fieldList[i].row]={};
	if(!elementForRow[props.fieldList[i].row][props.fieldList[i].column])elementForRow[props.fieldList[i].row][props.fieldList[i].column]=[];
	elementForRow[props.fieldList[i].row?props.fieldList[i].row:0][props.fieldList[i].column?props.fieldList[i].column:0].push(props.fieldList[i]);
	let objTempJson = {};
	objTempJson[props.fieldList[i].id]="";
	}
	elementForRow["itemList"]=[];
	let objJson ={
	elementForRow:elementForRow,
	disabledAll: true,
	disabledToShow: true,

	};
	if(props.isSon)objJson.getSuperList = props.getSuperList;
	this.state = objJson;
	this.handleUpdateInput = this.handleUpdateInput.bind(this);
	this.addElement = this.addElement.bind(this);
	this.removeField = this.removeField.bind(this);
    this.isEmptyList = this.isEmptyList.bind(this);
	this.pruebaConRedux = this.pruebaConRedux.bind(this);
	this.renderAdapter = this.renderAdapter.bind(this);
	this.render = this.render.bind(this);
	// this.getSuperList = this.getSuperList.bind();
	this.renderSon = this.renderSon.bind(this);
	this.renderSuper = this.renderSuper.bind(this);
	this.removeElementToSuper = this.removeElementToSuper.bind(this);
	this.addComponentInSuper = this.addComponentInSuper.bind(this);
	}
	handleUpdateInput(id,value) {
	let objJson={};
	objJson[id]=value;
	this.setState(objJson);
	}
	componentDidMount(){
	  console.log(ReactDOM.findDOMNode(this));
	}
	rowGenerator(rowToNow){
	return (
	<div className="columns-row-around">
	{_.map(rowToNow,columnToNow => {
	return (_.map(columnToNow,field => this.renderFieldList(field)));
	})}
	</div>
	);
	}
  isEmptyList(value) {
    this.setState({
      isEmptyList: value
    });
  }
	addComponentInSuper(nameComponentSon,elementToAdd){
	console.log('esto tendria que ser el padre',this.props.name);
	let objJson ={};
	if(this.state[nameComponentSon])objJson[nameComponentSon]=this.state[nameComponentSon];
	else objJson[nameComponentSon]=[];
	objJson[nameComponentSon].push(elementToAdd);
	console.log(objJson);
	this.setState(objJson);
	}
	// getSuperList(nameComponentSon){
	// 	if(this != undefined && this.state != undefined && this.props != undefined){
	// 	console.log('hijo',nameComponentSon);
	// 	console.log('father',this.props.name);
	// 	if(this.state[nameComponentSon])return this.state[nameComponentSon];
	// 	else return [];
	// 	}else return [];
	// }
	renderFieldList(field){
	let stateName=field.id,
	floatingLabelText=field.floatingLabelText;
	let disabledToShow = this.props.disabledToShow;
	switch (field.name.toLowerCase()) {
	case "textfield":
	return (<TextField
	value={this.state[stateName]}
	id={stateName}
	floatingLabelText={floatingLabelText}
	onChange={({ target: { id,value } }) => this.handleUpdateInput(id,value)}
	fullWidth={true}
	disabled={disabledToShow}
	style={{ margin: "5" }}
	/>);
	break;
        case "addchips":
          return (
            <AddElement
              name={stateName}
	addComponentInSuper ={this.addComponentInSuper}
	renderAdapter = {this.renderAdapter}
	isSon={true}
	getSuperList ={this.state[stateName]}
	removeElementToSuper={this.removeElementToSuper}
              fieldList={[
                {
                  id:{stateName},
                  name:"TextField",
	superProp:{},
                  floatingLabelText:"Colocar validacion",
                  inTable:true,
	included:true,
                  hdTableText:"Nombre del validacion",
                  row:1,
                  column:1
                }
              ]}
              isEmptyList={this.isEmptyList}
            />
          );
        break;
	}
	}
	addElement(fields) {
	let objJsonValues={};

	_.map(this.props.fieldList,field => {
	console.log(field.id);
	return objJsonValues[field.id]=this.state[field.id]
	});
	if(this.props.addComponentInSuper){
	// console.log('SE USO EL METODO DENTRO DE ADDELEMENT');
	// console.log(this.props.name);
	// console.log(objJsonValues);
	this.props.addComponentInSuper(this.props.name,objJsonValues);
	}else {
	// console.log(this.state);
	// console.log(this.props.fieldList);
	objJsonValues.included = this.props.included;
	// let flag = true;
	// if (fields.length > 0) {
	// 	_.map(fields, function(f, i) {
	// 	if (fields.get(i).id_flight === value1) {
	// 	flag = false;
	// 	}
	// 	});
	// }
	// if ( true) {
	let itemList = this.state.itemList;
	if(!itemList)itemList=[];
	itemList.push(objJsonValues);

	this.setState(itemList);
	fields.unshift(objJsonValues);
	console.log(fields);

	}

	objJsonValues={};
	_.map(this.props.fieldList,field => objJsonValues[field.id]="");
	this.setState(objJsonValues);
	// } else {
	// 	Util.showNoty(
	// 	"ERROR",
	// 	"Intenta agregar un codigo de vuelo que ya ha sido seleccionado."
	// 	);
	// }
	// if(this.props.isSon == undefined){
	// 	this.state['validation']=[];
	// 	this.render();
	// }
	if(this.props.isSon == undefined){
	console.log('es un ADD super');
	this.forceUpdate();
	this.state['validation']=[];
	// this.render();
	}
	this.props.isEmptyList(true);

	}
	handleDelete(item) {
	this.onTapConfirmDelete.bind(this, item)
	// AppMem.confirmDialog.open({
	// 	title: "Eliminar ProjectType",
	// 	messageConfirm:
	// 	"¿Esta seguro que desea eliminar projectType" + projectType.name + "?",
	// 	onAccept:
	// });
	}
	onTapConfirmDelete(item) {
	let itemList=this.state.itemList;
	itemList.splice(itemList.indexOf(item),1);
	this.setState(itemList);
	}
	removeElementToSuper(nameComponentSon,valueToDelete){
	if(this.state[nameComponentSon])this.state[nameComponentSon].splice(this.state[nameComponentSon].indexOf(valueToDelete),1);
	}
	removeField(i, fields,valueForSuper) {
	if(this.props.isSon){
	this.props.removeElementToSuper(this.props.name,valueForSuper);
	}
	fields.remove(i);
	if (fields.length > 0) {
	this.props.isEmptyList(true);
	} else {
	this.props.isEmptyList(false);
	}
	}
	renderBlank() {
	let mensaje = "";
	mensaje = " Empty List!";

	return (
	<TableRow key={1}>
	<TableRowColumn>
	<p>{mensaje}</p>
	</TableRowColumn>
	</TableRow>
	);
	}

	hColumnTableGenerator(value){
	return(
	<TableHeaderColumn>{value}</TableHeaderColumn>
	);
	}
	bColumnTableGenerator(value){
	return (
	<TableRowColumn style={{ marginLeft: 20 }}>
	{value}
	</TableRowColumn>
	);
	}

	clearnFieldList(listRemoveElements){
	for(let i in listRemoveElements){
	this.props.fieldList.splice(this.props.fieldList.indexOf(listRemoveElements[i]),1)
	}
	}
	renderSon(fields,removeField){
	console.log('en el renderSon',this.props.getSuperList);
	let renderList = this.props.getSuperList != undefined?this.props.getSuperList:[];
	return(
	<TableBody stripedRows displayRowCheckbox={false}>
	{renderList.length == 0?this.renderBlank():_.map(renderList, element => {
	return(
	<TableRow key={renderList.indexOf(element)} style={{ height: "16px", fontSize: "12px" }}>
	{_.map(this.props.fieldList,field =>{
	return(this.bColumnTableGenerator(element[field.id]));
	})}

	<TableRowColumn style={{ width: "20%" }}>
	<OptionsTableRowColumn
	handleDelete={() => console.log(' HOLA MUNDO DESDE EL DELETE')}
	/>
	</TableRowColumn>
	</TableRow>
	);
	})}
	</TableBody>
	);
	}
	renderSuper(fields,removeField){
	// console.log('resultado de la comparacion',this.props.isSon == undefined);
	// if(this.props.isSon == undefined)
	// {
	// 	this.render();
	// 	_.map(fields, (f, i) => {
	// 	_.map(this.props.fieldList,field =>{
	// 	console.log('start VALORES-----------------');
	// 	if(field.id == 'validation' )	{
	// 	console.log(fields.get(i)[field.id][0],field.id);
	// 	}
	// 	console.log('end VALORES-----------------');
	// 	})
	// 	});
	// }
	return(
	<TableBody stripedRows displayRowCheckbox={false}>
	{fields.length == 0?this.renderBlank():_.map(fields, (f, i) => {
	return(
	<TableRow key={i} style={{ height: "16px", fontSize: "12px" }}>
	{_.map(this.props.fieldList,field =>{
	if(field.inTable)return(this.bColumnTableGenerator(fields.get(i)[field.id]));
	})}

	<TableRowColumn style={{ width: "20%" }}>
	<OptionsTableRowColumn
	handleDelete={() => removeField(i, fields,fields.get(i))}
	/>
	</TableRowColumn>
	</TableRow>
	);
	})}
	</TableBody>
	);
	}
	renderAdapter(fields,removeField){

	if(this.props.isSon)return this.renderSon(fields,removeField);
	else return this.renderSuper(fields,removeField);

	}
	renderChips = ({ fields, removeField }) => {

	let Delete = this.handleDelete;
	const Show = this.handleShow;
	let disabledToShow = this.props.disabledToShow;
	return (
	<div style={{ display: this.props.display }}>
	<div style={{ display: "flex", flexDirection: "row" }}>
	<VerticalListFields
	titleText="Agregar Componentes"
	titleClass="title-papercard-simple"
	paperClass="papercard-simple"
	contentClass="content-papercard-around"
	zDepth={0}
	hideDivider={true}
	>
	<div className="columns-row-around">

	</div>
	{_.map(this.state.elementForRow, rowToNow => this.rowGenerator(rowToNow))}
	<CardText>
	<Table selectable={false}>
	<TableHeader displaySelectAll={false}>
	<TableRow>
	{_.map(this.props.fieldList,field =>{
	if(field.inTable)return(this.hColumnTableGenerator(field.hdTableText?field.hdTableText:field.id));
	})}
	<TableHeaderColumn style={{ width: "20%" }}>
	Acciones
	</TableHeaderColumn>
	</TableRow>
	</TableHeader>
	{this.renderSuper(fields,removeField)}
	</Table>
	</CardText>
	</VerticalListFields>
	<div className="addbtn-container">
	<FloatingActionButton
	style={styles.actionButton}
	onClick={() => this.addElement(fields)}
	disabled={this.props.disabledToShow}
	>
	<ContentAdd />
	</FloatingActionButton>

	</div>
	</div>
	</div>
	);
	};
	prueba(){

	let Delete = this.handleDelete;
	const Show = this.handleShow;
	let disabledToShow = this.props.disabledToShow;
	return(
	<div style={{ display: this.props.display }}>
	<div style={{ display: "flex", flexDirection: "row" }}>
	<VerticalListFields
	titleText="Agregar Componentes"
	titleClass="title-papercard-simple"
	paperClass="papercard-simple"
	contentClass="content-papercard-around"
	zDepth={0}
	hideDivider={true}
	>
	<div className="columns-row-around">

	</div>
	{_.map(this.state.elementForRow, rowToNow => this.rowGenerator(rowToNow))}
	<CardText>
	<Table selectable={false}>
	<TableHeader displaySelectAll={false}>
	<TableRow>
	{_.map(this.props.fieldList,field =>{
	if(field.inTable)return(this.hColumnTableGenerator(field.hdTableText?field.hdTableText:field.id));
	})}
	<TableHeaderColumn style={{ width: "20%" }}>
	Acciones
	</TableHeaderColumn>
	</TableRow>
	</TableHeader>
	{this.renderSon(null,null)}
	</Table>
	</CardText>
	</VerticalListFields>
	<div className="addbtn-container">
	<FloatingActionButton
	style={styles.actionButton}
	onClick={() => this.addElement(null)}
	disabled={this.props.disabledToShow}
	>
	<ContentAdd />
	</FloatingActionButton>

	</div>
	</div>
	</div>

	);
	}
	pruebaConRedux(){

	return null;
	}
	render() {
	let pruebaConRedux = this.pruebaConRedux();
	console.log(pruebaConRedux);
	let prueba = this.prueba.bind(this);
	let options={};
	_.map(this.props.fieldList,(field) => {
	options[field.id]=this.state[field.id];
	}
	);
	if(this.props.isSon)	return (
	<div style={{ display: this.props.display }}>
	<div style={{ display: "flex", flexDirection: "row" }}>
	<VerticalListFields
	titleText="Agregar Componentes"
	titleClass="title-papercard-simple"
	paperClass="papercard-simple"
	contentClass="content-papercard-around"
	zDepth={0}
	hideDivider={true}
	>
	<div className="columns-row-around">

	</div>
	{_.map(this.state.elementForRow, rowToNow => this.rowGenerator(rowToNow))}
	<CardText>
	<Table selectable={false}>
	<TableHeader displaySelectAll={false}>
	<TableRow>
	{_.map(this.props.fieldList,field =>{
	if(field.inTable)return(this.hColumnTableGenerator(field.hdTableText?field.hdTableText:field.id));
	})}
	<TableHeaderColumn style={{ width: "20%" }}>
	Acciones
	</TableHeaderColumn>
	</TableRow>
	</TableHeader>
	{this.renderSon(null,null)}
	</Table>
	</CardText>
	</VerticalListFields>
	<div className="addbtn-container">
	<FloatingActionButton
	style={styles.actionButton}
	onClick={() => this.addElement(null)}
	disabled={this.props.disabledToShow}
	>
	<ContentAdd />
	</FloatingActionButton>

	</div>
	</div>
	</div>
	);
	else return (
	<FieldArray
	display={this.props.display}
	name={this.props.name}
	component={this.renderChips}
	{...options}
	included={this.props.included}
	removeField={this.removeField}
	/>
	);
	}
}

export default AddElement;
