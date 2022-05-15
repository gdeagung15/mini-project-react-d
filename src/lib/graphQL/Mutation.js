import { gql } from "@apollo/client";

export const UPDATE_DATA_STUDENT = gql`
  mutation MyMutation(
    $id: Int!
    $idNilai: Int!
    $name: String
    $gender: String
    $no_id: String
    $kelas: String
    $semester: String
    $birth_date: date
  ) {
    update_e_raport_user_by_pk(
      pk_columns: { id: $id }
      _set: {
        name: $name
        gender: $gender
        no_id: $no_id
        birth_date: $birth_date
      }
    ) {
      id
    }
    update_e_raport_nilai_by_pk(
      pk_columns: { id: $idNilai }
      _set: { kelas: $kelas, semester: $semester }
    ) {
      id
    }
  }
`;

export const INSERT_DATA_NILAI_KDS_PENGETAHUAN = gql`
  mutation MyMutation($objects: [e_raport_nilai_kd_insert_input!]!) {
    insert_e_raport_nilai_kd(
      objects: $objects
      on_conflict: { update_columns: pengetahuan, constraint: nilai_kd_pkey }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_DATA_NILAI_KDS_KETERAMPILAN = gql`
  mutation MyMutation($objects: [e_raport_nilai_kd_insert_input!]!) {
    insert_e_raport_nilai_kd(
      objects: $objects
      on_conflict: { update_columns: keterampilan, constraint: nilai_kd_pkey }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_DATA_NILAI_SIKAP = gql`
  mutation MyMutation(
    $objects: [e_raport_sikap_insert_input!]!
    $update_columns: [e_raport_sikap_update_column!] = [
      berdoa
      beribadah
      bersyukur
      toleransi
    ]
  ) {
    insert_e_raport_sikap(
      objects: $objects
      on_conflict: { constraint: sikap_pkey, update_columns: $update_columns }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const UPDATE_NILAI_SIKAP_FK = gql`
  mutation MyMutation($nilai_sosial: Int, $nilai_spiritual: Int, $id: Int!) {
    update_e_raport_nilai_by_pk(
      pk_columns: { id: $id }
      _set: { nilai_spiritual: $nilai_spiritual, nilai_sosial: $nilai_sosial }
    ) {
      id
    }
  }
`;

export const UPDATE_MAPEL_KD = gql`
  mutation MyMutation(
    $id: Int!
    $nama: String
    $objects: [e_raport_kd_insert_input!]!
  ) {
    update_e_raport_tema_by_pk(pk_columns: { id: $id }, _set: { nama: $nama }) {
      id
    }
    insert_e_raport_kd(
      objects: $objects
      on_conflict: { constraint: kd_pkey, update_columns: nama }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_ONE_TEMA = gql`
  mutation MyMutation($mapel_id: Int, $nama: String) {
    insert_e_raport_tema_one(object: { mapel_id: $mapel_id, nama: $nama }) {
      id
    }
  }
`;

export const INSERT_NEW_USER = gql`
  mutation MyMutation($object: e_raport_user_insert_input!) {
    insert_e_raport_user_one(object: $object) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation MyMutation(
    $object: e_raport_user_insert_input!
    $update_columns: [e_raport_user_update_column!] = [
      name
      no_id
      password
      role
      username
      active
    ]
  ) {
    insert_e_raport_user_one(
      object: $object
      on_conflict: {
        constraint: user_no_id_key
        update_columns: $update_columns
      }
    ) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation MyMutation($id: Int!) {
    update_e_raport_user_by_pk(
      pk_columns: { id: $id }
      _set: { active: false }
    ) {
      id
    }
  }
`;

export const INSERT_DATA_NEW_STUDENT = gql`
  mutation MyMutation($object: e_raport_nilai_insert_input!) {
    insert_e_raport_nilai_one(object: $object) {
      id
    }
  }
`;

export const DELETE_NILAI_USER = gql`
  mutation MyMutation($id: Int!) {
    delete_e_raport_nilai_kd(where: { nilai_id: { _eq: $id } }) {
      affected_rows
    }
    delete_e_raport_nilai_by_pk(id: $id) {
      id
    }
  }
`;

export const DELETE_TEMA = gql`
  mutation MyMutation($_eq: Int!) {
    delete_e_raport_nilai_kd(where: { kd: { tema_id: { _eq: $_eq } } }) {
      affected_rows
    }
    delete_e_raport_kd(where: { tema_id: { _eq: $_eq } }) {
      affected_rows
    }
    delete_e_raport_tema_by_pk(id: $_eq) {
      id
    }
  }
`;
