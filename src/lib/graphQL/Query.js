import { gql } from "@apollo/client";

export const LOGIN = gql`
  query MyQuery($username: String, $password: String) {
    e_raport_user(
      where: {
        active: { _eq: true }
        password: { _eq: $password }
        username: { _eq: $username }
      }
    ) {
      id
      username
      role
    }
  }
`;

export const GET_DATA_STUDENT_EMAIL = gql`
  query MyQuery($username: String) {
    e_raport_nilai(where: { user: { username: { _eq: $username } } }) {
      id
      kelas
      semester
      tahun_ajaran
      user {
        id
        no_id
        gender
      }
    }
  }
`;

export const GET_ALL_STUDENT = gql`
  query MyQuery($where: e_raport_nilai_bool_exp) {
    e_raport_nilai(where: $where) {
      id
      kelas
      semester
      user {
        id
        username
        no_id
        gender
        name
        birth_date
      }
    }
  }
`;

export const GET_NILAI_INPUT = gql`
  query MyQuery {
    e_raport_nilai(where: { user: { active: { _eq: true } } }) {
      id
      user {
        id
        name
        active
      }
      nilai_spiritual
      nilai_sosial
      nilai_kds {
        keterampilan
        pengetahuan
        kd {
          id
        }
      }
    }
  }
`;

export const GET_NAME_BY_ID_USER = gql`
  query MyQuery($id: Int!) {
    e_raport_user_by_pk(id: $id) {
      name
      nilais {
        id
      }
    }
  }
`;

export const GET_MAPEL_ALL = gql`
  query MyQuery {
    e_raport_mapel {
      id
      name
    }
  }
`;

export const GET_MAPEL_DETAILS = gql`
  query MyQuery($id: Int!, $idU: Int!) {
    e_raport_mapel_by_pk(id: $id) {
      name
      temas(order_by: { nama: asc }) {
        nama
        kds {
          id
          nama
          nilai_kds(where: { nilai: { user_id: { _eq: $idU } } }) {
            pengetahuan
            keterampilan
          }
        }
      }
    }
  }
`;

export const GET_RAPORT_DETAILS = gql`
  query MyQuery($id: Int!) {
    e_raport_user_by_pk(id: $id) {
      name
      no_id
      nilais {
        kelas
        semester
        sosial {
          berdoa
          beribadah
          bersyukur
        }
        spiritual {
          berdoa
          beribadah
          bersyukur
        }
        nilai_kds_aggregate(
          order_by: { kd: { tema: { mapel: { name: asc } } } }
        ) {
          aggregate {
            avg {
              keterampilan
              pengetahuan
            }
          }
          nodes {
            kd {
              tema {
                mapel {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_RAPORT_USER_DETAIL = gql`
  query MyQuery($id: Int!) {
    e_raport_user_by_pk(id: $id) {
      name
      no_id
      nilais {
        id
        kelas
        semester
        sosial {
          berdoa
          beribadah
          bersyukur
          toleransi
        }
        spiritual {
          berdoa
          beribadah
          bersyukur
          toleransi
        }
      }
    }
  }
`;

export const GET_NILAI_USER_DETAIL = gql`
  query MyQuery($_eq: Int!) {
    e_raport_nilai_total(where: { user_id: { _eq: $_eq } }) {
      keterampilan
      mapel_id
      name
      pengetahuan
      user_id
    }
  }
`;

export const GET_NILAI_SIKAP = gql`
  query MyQuery($_eq: Int!) {
    e_raport_nilai(where: { user_id: { _eq: $_eq } }) {
      sosial {
        berdoa
        beribadah
        bersyukur
        toleransi
        id
      }
      spiritual {
        berdoa
        beribadah
        bersyukur
        toleransi
        id
      }
    }
  }
`;

export const GET_MAPEL_TEMA = gql`
  query MyQuery($id: Int!) {
    e_raport_mapel_by_pk(id: $id) {
      name
      temas(order_by: { nama: asc }) {
        id
        nama
        kds {
          id
          nama
        }
      }
    }
  }
`;

export const GET_TEMA = gql`
  query MyQuery($id: Int!) {
    e_raport_tema_by_pk(id: $id) {
      id
      nama
      kds {
        id
        nama
      }
    }
  }
`;

export const GET_ALL_USER = gql`
  query MyQuery($where: e_raport_user_bool_exp) {
    e_raport_user(where: $where) {
      id
      name
      role
      username
      password
      no_id
      active
    }
  }
`;

export const GET_ALL_NON_STUDENT = gql`
  query MyQuery {
    e_raport_user(
      where: {
        role: { _like: "siswa" }
        _not: { nilais: {} }
        active: { _eq: true }
      }
    ) {
      id
      name
      no_id
      username
    }
  }
`;
