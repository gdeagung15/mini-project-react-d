import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Route, Switch } from "react-router-dom";
import GeneralContextProvider from "../context/GeneralContext";
import { client } from "../lib/ApolloClient";
import AddGrade from "../pages/AddGrade";
import AddGradKeterampilan from "../pages/AddGradeKeterampilan";
import AddGradePengetahuan from "../pages/AddGradePengetahuan";
import AddGradeSikap from "../pages/AddGradeSikap";
import AddUser from "../pages/AddUser";
import ChangeDataMapel from "../pages/ChangeDataMapel";
import ChangeDataStudent from "../pages/ChangeDataStudent";
import ChangeDataTeacher from "../pages/ChangeDataTeacher";
import ChangeGrade from "../pages/ChangeGrade";
import ChangeMapelKD from "../pages/ChangeMapelKD";
import ChangeMapelTema from "../pages/ChangeMapelTema";
import DetailRaport from "../pages/DetailRaport";
import Login from "../pages/Login";
import Raport from "../pages/Raport";
import Welcome from "../pages/Welcome";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GeneralContextProvider>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/nilai-siswa" component={AddGrade}></Route>
          <Route path="/ubah-data-siswa" component={ChangeDataStudent}></Route>
          <Route path="/ubah-data-guru" component={ChangeDataTeacher}></Route>
          <Route
            exact
            path="/ubah-data-mapel"
            component={ChangeDataMapel}
          ></Route>
          <Route
            exact
            path="/ubah-data-mapel/:mapel"
            component={ChangeMapelTema}
          ></Route>
          <Route
            exact
            path="/ubah-data-mapel/:mapel/tema/:tema"
            component={ChangeMapelKD}
          ></Route>
          <Route path="/tambah-user" component={AddUser}></Route>
          <Route
            exact
            path="/edit-nilai-siswa/:id"
            component={ChangeGrade}
          ></Route>
          <Route
            path="/edit-nilai-siswa/:id/sikap"
            component={AddGradeSikap}
          ></Route>
          <Route
            path="/edit-nilai-siswa/:id/pengetahuan/:mapel"
            component={AddGradePengetahuan}
          ></Route>
          <Route
            path="/edit-nilai-siswa/:id/keterampilan/:mapel"
            component={AddGradKeterampilan}
          ></Route>
          <Route exact path="/lihat-raport" component={Raport}></Route>
          <Route path="/lihat-raport/:id" component={DetailRaport}></Route>
          <Route path="/" component={Welcome}></Route>
        </Switch>
      </GeneralContextProvider>
    </ApolloProvider>
  );
}
