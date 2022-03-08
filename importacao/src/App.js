// import logo from './logo.svg';
// import './App.css';
// import 'antd/dist/antd.less';
// import { Row, Select, Card, Col, PageHeader } from 'antd';
// import { Button, Radio, Upload } from 'antd';
// import { DownloadOutlined,ImportOutlined, UploadOutlined, StarOutlined } from '@ant-design/icons';


// const { Option } = Select;

// function App() {

//   // let tilte = <ImportOutlined /> + 'Importacao';
//   return (
//     <Card>
//       <PageHeader title="Importacao"/>
//       <Card style={{ width: '87%', margin: 'auto' }} >
//         <Row gutter={24} >
//           <Col span={6} xs={12} sm={16}>
//             <label style={{ margin: '10px' }}>Descrição</label>
//             <Select
              
//               style={{ margin: '10px', width: '100%', }}
//               placeholder="Selecione Tabela"
//               // defaultValue={['']}
//               onChange={handleChange}
//               optionLabelProp="label"
//             >
//               <Option value="china" label="China">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="China">
//                     🇨🇳
//                   </span>
//                   China (中国)
//                 </div>
//               </Option>
//               <Option value="usa" label="USA">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="USA">
//                     🇺🇸
//                   </span>
//                   USA (美国)
//                 </div>
//               </Option>
//               <Option value="japan" label="Japan">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="Japan">
//                     🇯🇵
//                   </span>
//                   Japan (日本)
//                 </div>
//               </Option>
//               <Option value="korea" label="Korea">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="Korea">
//                     🇰🇷
//                   </span>
//                   Korea (韩国)
//                 </div>
//               </Option>
//             </Select>
//           </Col>
//           <Col span={6} xs={12} sm={16}>

//           <label style={{ margin: '10px' }}>Modulo</label>
//             <Select
              
//               style={{ width: '100%', margin: '10px', }}
//               placeholder="Selecione Modulo"
//               // defaultValue={['']}
//               onChange={handleChange}
//               optionLabelProp="label"
//             >
//               <Option value="china" label="China">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="China">
//                     🇨🇳
//                   </span>
//                   China (中国)
//                 </div>
//               </Option>
//               <Option value="usa" label="USA">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="USA">
//                     🇺🇸
//                   </span>
//                   USA (美国)
//                 </div>
//               </Option>
//               <Option value="japan" label="Japan">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="Japan">
//                     🇯🇵
//                   </span>
//                   Japan (日本)
//                 </div>
//               </Option>
//               <Option value="korea" label="Korea">
//                 <div className="demo-option-label-item">
//                   <span role="img" aria-label="Korea">
//                     🇰🇷
//                   </span>
//                   Korea (韩国)
//                 </div>
//               </Option>
//             </Select>
//           </Col>
//           <Col span={2} xs={8} sm={16}>
           
//           <label style={{ margin: '10px' }}>Template</label>
//             <Button type="primary" icon={<DownloadOutlined />}
//               style={{  margin: '10px',  }}>Baixar</Button>
           
//           </Col>
          
//           <Col span={2} xs={8} sm={16}>
            
//             <label style={{ margin: '10px'}}>Importar</label>
//             <Upload>
//               <Button icon={<UploadOutlined />}
//                 style={{  margin: '10px',backgroundColor: 'green', color: 'white' }}>Importar</Button>
//             </Upload>
            
//           </Col>





//         </Row>
//       </Card>
//     </Card>
//   );
// }

// function handleChange(value) {
//   console.log(`selected ${value}`);
// }

// export default App;

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.less';
import { Row, Select, Card, Col, PageHeader, List } from 'antd';
import { Button, Radio, Upload, message, Modal, Result } from 'antd';
import { DownloadOutlined, ImportOutlined, UploadOutlined, StarOutlined } from '@ant-design/icons';
import api from './services/api';
import { CSVLink } from 'react-csv'
//import {exEmpresa} from '../../template'

const { Option } = Select;

function App() {
  const [desc, setDesc] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [modulo, setModulo] = useState('');
  const [list, setList] = useState([])
  const [links, setLinks] = useState('')
  const [mod, setMod] = useState([]);
  const [msg, setMsg] = useState([]);
  const [visDesc, setVisDesc] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState(['', '']);
  const [template, setTemplate] = useState({ headers: [{ label: 'teste', key: 'teste' }], nome: '' })
  let data = [{}];
  const exEmpresa = [
    { label: "razao_social", key: "razao_social" },
    { label: "cnpj", key: "cnpj" },
    { label: "cep", key: "cep" },
    { label: "endereco", key: "endereco" },
    { label: "bairro", key: "bairro" },
    { label: "cidade", key: "cidade" },
    { label: "estado", key: "estado" },
    { label: "telefone", key: "telefone" },
    { label: "email", key: "email" },
    { label: "ramo_atividade", key: "ramo_atividade" }
  ];
  const exCliente = [
    { label: "razao_social", key: "razao_social" },
    { label: "cnpj", key: "cnpj" },
    { label: "cep", key: "cep" },
    { label: "endereco", key: "endereco" },
    { label: "bairro", key: "bairro" },
    { label: "cidade", key: "cidade" },
    { label: "estado", key: "estado" },
    { label: "telefone", key: "telefone" },
    { label: "email", key: "email" },
    { label: "ramo_atividade", key: "ramo_atividade" }
  ];

  const exEquipamentos = [
    { label: "CNPJ Filial", key: "Cliente" },
    { label: "Equipamento", key: "Equipamento" },
    { label: "Equipamento Pai", key: "Equipamento_Pai" },
    { label: "Nº Patrimonio", key: "N_Patrimonio" },
    { label: "Centro Custo", key: "Centro_Custo" },
    { label: "Descricao", key: "Descricao" },
    { label: "Observações", key: "Observacões" },
    { label: "Familia", key: "Familia" },
    { label: "Tipo de Equipamento", key: "Tipo_Equipamento" },
    { label: "Unidade", key: "Unidade" },
    { label: "Operação", key: "Operação" },
    { label: "Departamento", key: "Departamento" },
    { label: "Localização", key: "Localização" },
    { label: "Fabricante", key: "Fabricante" },
    { label: "Marca", key: "Marca" },
    { label: "Modelo", key: "Modelo" },
    { label: "Serie", key: "Serie" },
    { label: "Nota Fiscal", key: "Nota_Fiscal" },
    { label: "Ano Fabric.", key: "Ano_Fabric." },
    { label: "Data Compra", key: "Data_Compra" },
    { label: "Tempo de Garantia (Meses)", key: "Tempo_Garantia" },
    { label: "Custo / Hora", key: "Custo_hora" },
    { label: "Tipo", key: "Tipo" },
    { label: "Consumo", key: "Consumo" },
    { label: "Classificação", key: "Classificação" },
    { label: "Criticidade", key: "Criticidade" },
    { label: "Tempo de Garantia (Meses)", key: "Tempo_Garantia" },
    { label: "Status do Equipamento", key: "Status_Equipamento" },
    { label: "Proprietario", key: "Proprietario" },
    { label: "Frota", key: "Frota" },
    { label: "Chassi", key: "Chassi" },
    { label: "Placa", key: "Placa" },
    { label: "Cor", key: "Cor" },
    { label: "Renavam", key: "Renavam" },
    { label: "Numero", key: "Numero" },
    { label: "Crv", key: "Crv" },
    { label: "Data", key: "Data" },
    { label: "Emissao", key: "Emissao" },
    { label: "Licenciamento", key: "Licenciamento" },
    { label: "Apolice", key: "Apolice" },
    { label: "Vencimento", key: "Vencimento" },
    { label: "Seguro", key: "Seguro" },
    { label: "Nº CT Finame", key: "CT_Finame" },
    { label: "Beneficiario", key: "Beneficiario" },
  ];

  const success = () => {
    message.success({
      content: msg,
      className: 'custom-class',
      style: {
        marginTop: '20vh',
        height: '550px'
      },
    });
  };


  React.useEffect(() => {
    api.get('/infoImport').then((res) => {
      let data = res.data;
      console.log(data);
      let { tabela, modulo } = data;
      setDesc([]);
      let nDesc = tabela.map(el => {
        return ({ label: el.descricao, val: el.nome_tabela })
      })

      let nMod = modulo.map(el => {
        return ({ label: el.nome, id: el.id })
      })
      console.log(nMod, 'nmod')
      setDesc(nDesc)
      setMod(nMod);
    });
  }, []);

  function importacao(file, fileList) {
    //console.log(file,fileList)

    let formData = new FormData();

    formData.append('file', file);
    //formData.append('user', 'Robson');

    api.post(links, formData).then((res) => {
      let data = res.data;
      console.log(data, 'data');
      if (data.error) {
        setTitle(['error', 'Erro ao Importar!']);
        let msg = [];
        for (let i = 0; i < data.msg.length; i++) {
          msg.push(data.msg[i]);
        }
        //console.log(msg)
        setMsg(msg);
        setIsModalVisible(true);
      } else {
        if (data.valores && data.valores.length > 0) {
          setTitle(['warning', 'Importação Concluida!']);
          //console.log(data.valores)
          let novoMsg = []
          data.valores.forEach(e => {
            novoMsg.push(e += ' valor já cadastrado favor insira outro!')
          })
          //console.log(novoMsg);
          setMsg(novoMsg);
        } else {
         console.log(data);

          setTitle(['success', 'Importação Concluida!']);
          setMsg(data.msg)
        }
        setIsModalVisible(true);
      }
      setList([]);
      //return false;
    });

    return false;
  }

  function handleOk() {
    setIsModalVisible(false)
  }

  function onChangeDescricao(e) {
    //console.log(e);
    let temp = {};
    if (e.length > 0) {
      setVisDesc(false);
      switch (e) {
        case 'cadastro_de_empresas':
          setLinks('/importarEmpresas');
          temp = {
            headers: exEmpresa,
            nome: 'Template_Empresa'
          }
          setTemplate(temp)
          break;
        case 'cadastro_de_filiais':
          setLinks('/importarCliente')
          temp = {
            headers: exCliente,
            nome: 'Template_Cliente'
          }
          setTemplate(temp)
          break;
        case 'cadastro_de_equipamentos':
          setLinks('/importarEquipamento')
          temp = {
            headers: exEquipamentos,
            nome: 'Template_Equipamentos'
          }
          setTemplate(temp)
          break;
        case 'sec_users':
          setLinks('/importarUsuario')
          temp = {
            headers: exEmpresa,
            nome: 'Template_Empresa'
          }
          setTemplate(temp)
          break;


        case 'sofman_descricao_planejamento_manutencao':
          setLinks('/importarPlanejamento')
          temp = {
            headers: exEmpresa,
            nome: 'Template_Planejamento'
          }
          setTemplate(temp)
          break;
        default:
          break;
      }
    } else {
      setVisDesc(true)
    }
  }

  //buscar();
  // let tilte = <ImportOutlined /> + 'Importacao';
  return (
    <Card>
      <PageHeader title="Importacao" />
      <Card style={{ width: '87%', margin: 'auto' }} >
        <Row gutter={24} >
          <Col span={6} xs={12} sm={16}>
            <label style={{ margin: '10px' }}>Descrição</label>
            <Select

              style={{ margin: '10px', width: '100%', }}
              placeholder="Selecione Tabela"
              // defaultValue={['']}
              onChange={(e) => onChangeDescricao(e)}
              optionLabelProp="label"
            >
              {desc.length ? desc.map((element, id) => {
                return (
                  <Option key={id} value={element.val} label={element.label}>
                    <div className="demo-option-label-item">

                      {element.label}
                    </div>
                  </Option>
                );
              }) : (
                <Option label={'Sem tabelas'}>
                  <div className="demo-option-label-item">

                    Sem tabelas
                  </div>
                </Option>
              )}
            </Select>
          </Col>
          <Col span={6} xs={12} sm={16}>

            <label style={{ margin: '10px' }}>Modulo</label>
            <Select

              style={{ width: '100%', margin: '10px', }}
              placeholder="Selecione Modulo"
              // defaultValue={['']}
              //onChange={handleChange}
              optionLabelProp="label"
            >
              {mod.length ? mod.map((element, id) => {
                return (
                  <Option key={element.id} label={element.label}>
                    <div className="demo-option-label-item">

                      {element.label}
                    </div>
                  </Option>
                );
              }) : (
                <Option label={'Sem Modulos'}>
                  <div className="demo-option-label-item">

                    Sem Modulos
                  </div>
                </Option>
              )}
            </Select>
          </Col>
          <Col span={2} xs={8} sm={16}>

            <label style={{ margin: '10px' }}>Template</label>
            <Button disabled={visDesc} type="primary" icon={<DownloadOutlined />}
              style={{ margin: '10px' }} >
              <CSVLink data={data} style={{ color: 'white', paddingLeft: 5 }} filename={template.nome} headers={template.headers} separator={";"}>
                Baixar
              </CSVLink>
            </Button>


          </Col>

          <Col span={2} xs={8} sm={16}>

            <label style={{ margin: '10px' }}>Importar</label>
            <Upload fileList={list} accept='*/.csv' action={''} beforeUpload={(file, fileList) => importacao(file, fileList)}>
              <Button disabled={visDesc} icon={<UploadOutlined />}
                style={{ margin: '10px', backgroundColor: 'green', color: 'white' }}>Import</Button>
            </Upload>

          </Col>
          <Modal
            maskClosable={false}
            closable={true}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleOk}
            bodyStyle={{
              overflowX: 'auto',
              height: '550px'
            }}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                Fechar
              </Button>,
            ]}
          >

            <List
              header={<Result
                status={title[0]}
                title={title[1]}
              />}
              bordered

              dataSource={msg}
              renderItem={item => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          </Modal>




        </Row>
      </Card>
    </Card>
  );
}


export default App;
