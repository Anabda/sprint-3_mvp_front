/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/aparelhos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("myTableBody").innerHTML = "";
        data.aparelhos.forEach(item => insertList(item.codigo, item.nome, item.potencia, item.voltagem, item.comodo, item.amperagem, item.diametro_fio))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
 
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputCode, inputName, inputPower, inputVoltage, inputRoom, inputAmperage, inputDiameter) => {
    const formData = new FormData();
    formData.append('codigo', inputCode);
    formData.append('nome', inputName);
    formData.append('potencia', inputPower);
    formData.append('voltagem', inputVoltage);
    if (inputRoom != "") formData.append('comodo', inputRoom);
    if (inputAmperage != "") formData.append('amperagem', inputAmperage);
    if (inputDiameter != "") formData.append('diametro_fio', inputDiameter);
    
    let url = 'http://127.0.0.1:5000/aparelho';
    fetch(url, {
      method: 'post',
      body: formData
    })
    .then((response) => {
      console.log("response: ",response.json());
      console.log("status:",response.ok);
      if (response.ok) {
        alert("Aparelho adicionado com sucesso!");
        getList();
      }
      else {
        alert("Erro: item não adicionado");
      }
    })
    .catch((error) => {
      console.error('Error:', error);        
    });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão excluir para cada item da lista
    --------------------------------------------------------------------------------------
  */
  
  const insertButton = (parent) => {
    let icon = document.createElement("i");
    icon.className = "fa-solid fa-trash"; 
    parent.appendChild(icon);

}
 
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão excluir
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let lixeira = document.getElementsByClassName("fa-solid fa-trash");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < lixeira.length; i++) {
      lixeira[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza que deseja excluir o aparelho?")) {
          deleteItem(nomeItem)
          alert("Aparelho removido com sucesso!")
          getList()
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/aparelho?codigo=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

    /*
    --------------------------------------------------------------------------------------
    Função para criar um botão edit para cada item da lista
    --------------------------------------------------------------------------------------
  */
    const insertEditButton = (parent) => {
      let editIcon = document.createElement("i");
      editIcon.className = "fa-solid fa-pen";
      parent.appendChild(editIcon);
      
    }
    
   
    /*
      --------------------------------------------------------------------------------------
      Função para editar um item da lista de acordo com o click no botão edit
      --------------------------------------------------------------------------------------
    */
    
      const getElement = () => {
      let editar = document.getElementsByClassName("fa-solid fa-pen");
      // var table = document.getElementById('myTable');
      let i;
      for (i = 0; i < editar.length; i++) {
        editar[i].onclick = function () {
          let div = this.parentElement.parentElement;
          const nomeItem = div.getElementsByTagName('td')[0].innerHTML
          const modal = document.getElementById("myModal");
          getItem(nomeItem)
          modal.style.display = "block";
          
  
        }
      }
    }
    
    /*
      --------------------------------------------------------------------------------------
      Função para chamar dados de um item da lista do servidor via requisição GET
      --------------------------------------------------------------------------------------
    */
    const getItem = (item) => {
      console.log(item)
      let url = 'http://127.0.0.1:5000/aparelho?codigo=' + item;
      fetch(url, {
        method: 'get'
      })
        .then(response => response.json())
        .then(data => {
		      console.log(JSON.stringify(data));
		      let inputCodigo = document.getElementById("editCode")
          inputCodigo.value=item
		      let inputNome = document.getElementById("editName");
          inputNome.value = data.nome; 
          let inputPotencia = document.getElementById("editPower");
          inputPotencia.value = data.potencia; 
          let inputVoltagem = document.getElementById("editVoltage");
          inputVoltagem.value = data.voltagem; 
          let inputComodo = document.getElementById("editRoom");
          inputComodo.value = data.comodo; 
          let inputAmperagem = document.getElementById("editAmperage");
          inputAmperagem.value = data.amperagem; 
          let inputDiametro = document.getElementById("editDiameter");
          inputDiametro.value = data.diametro_fio; 
          })
        .catch((error) => {
          console.error('Error:', error);
      });
    }
  
    
/*
      --------------------------------------------------------------------------------------
      Função para editar dados de um item da lista do servidor via requisição PUT
      --------------------------------------------------------------------------------------
    */
  async function putItem(inputCode, inputName, inputPower, inputVoltage, inputRoom, inputAmperage, inputDiameter) {
    const formData = new FormData();
    formData.append('codigo', inputCode);
    formData.append('nome', inputName);
    formData.append('potencia', inputPower);
    formData.append('voltagem', inputVoltage);
    if (inputRoom != "") formData.append('comodo', inputRoom);
    if (inputAmperage != "") formData.append('amperagem', inputAmperage);
    if (inputDiameter != "") formData.append('diametro_fio', inputDiameter);
    let url = 'http://127.0.0.1:5000/aparelho?codigo=' + inputCode;
    fetch(url, {
      method: 'put',
      body: formData
    })
      .then((response) => {
        console.log("response: ", response.json());
        console.log("status:", response.ok);
        if (response.ok) {
          alert("Aparelho editado com sucesso!");
          closeModal()
          getList();
        }
        else {
          alert("Erro: item não adicionado");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const editItem = () => {
    let inputCode = document.getElementById("editCode");
    let inputName = document.getElementById("editName");
    let inputPower = document.getElementById("editPower");
    let inputVoltage = document.getElementById("editVoltage");
    let inputRoom = document.getElementById("editRoom").value;
    let inputAmperage = document.getElementById("editAmperage").value;
    let inputDiameter = document.getElementById("editDiameter").value;
    
    let camposObrigatorios = [inputCode, inputName, inputPower, inputVoltage];
    let error = false;
    for (let i = 0; i < camposObrigatorios.length; i++) {
      let campoObrigatorio = camposObrigatorios[i]
      if (campoObrigatorio.value === '') {
        campoObrigatorio.classList.add('newItemFieldError');
        campoObrigatorio.classList.remove('newItemField');
        error = true;
      } else {
        campoObrigatorio.classList.add('newItemField');
        campoObrigatorio.classList.remove('newItemFieldError');
      }
    } 
    if (error) {
      alert("Erro: campos obrigatórios não preenchidos");
    } else {
      putItem(inputCode.value, inputName.value, inputPower.value, inputVoltage.value, inputRoom, inputAmperage, inputDiameter)
    }    
  }

  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo aparelho 
    --------------------------------------------------------------------------------------
  */

  const newItem = () => {
    let inputCode = document.getElementById("newCode");
    let inputName = document.getElementById("newName");
    let inputPower = document.getElementById("newPower");
    let inputVoltage = document.getElementById("newVoltage");
    let inputRoom = document.getElementById("newRoom").value;
    let inputAmperage = document.getElementById("newAmperage").value;
    let inputDiameter = document.getElementById("newDiameter").value;
    
    let camposObrigatorios = [inputCode, inputName, inputPower, inputVoltage];
    let error = false;
    for (let i = 0; i < camposObrigatorios.length; i++) {
      let campoObrigatorio = camposObrigatorios[i]
      if (campoObrigatorio.value === '') {
        campoObrigatorio.classList.add('newItemFieldError');
        campoObrigatorio.classList.remove('newItemField');
        error = true;
      } else {
        campoObrigatorio.classList.add('newItemField');
        campoObrigatorio.classList.remove('newItemFieldError');
      }
    } 
    if (error) {
      alert("Erro: campos obrigatórios não preenchidos");
    } else {
      postItem(inputCode.value, inputName.value, inputPower.value, inputVoltage.value, inputRoom, inputAmperage, inputDiameter)
    }    
  }

  /*
    --------------------------------------------------------------------------------------
    Função para inserir itens na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (code, name, power, voltage, room, amperage, diameter) => {
    var item = [code, name, power, voltage, room, amperage, diameter]
    var table = document.getElementById('myTableBody');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertEditButton(row.insertCell(-1))
    insertButton(row.insertCell(-1))
    document.getElementById("newCode").value = "";
    document.getElementById("newName").value = "";
    document.getElementById("newPower").value = "";
    document.getElementById("newVoltage").value = "";
    document.getElementById("newRoom").value = "";
    document.getElementById("newAmperage").value = "";
    document.getElementById("newDiameter").value = "";
    getElement()
    removeElement()
    
  }
  const closeModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    };

    document.getElementById("sheetjsexport").addEventListener('click', function() {
      /* Create worksheet from HTML DOM TABLE */
      var wb = XLSX.utils.table_to_book(document.getElementById("myTable"));
      /* Export to file (start a download) */
      XLSX.writeFile(wb, "lista_aparelhos.xlsx");
    });

  document.addEventListener("DOMContentLoaded", function () {
    // Função para abrir o modal
    const openModal = () => {
        const modal = document.getElementById("myModal");
        console.log("vou mostrar o modal")
        modal.style.display = "block";
    };

    // Evento de clique no botão "Fechar" do modal
    const closeModalButton = document.querySelector(".close");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", () => {
            closeModal();
        });
    }


    // Inicialize os eventos apenas após o DOM estar pronto
    getElement();
});
