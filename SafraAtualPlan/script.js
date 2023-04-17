const callVolta = document.getElementById('btnVoltar');
callVolta.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/index.html';
});
       
const callCadastrarProdutor = document.getElementById('btn_adicionar_cliente');
callCadastrarProdutor.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/CadastrarProdutor/index.html';
});


  


function mostrarCampoData() {
    
    document.getElementById("data-text").style.display = "none";
  
    document.getElementById("vencimento").style.display = "block";
  }

class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        // this.limpar();   
    }

    salvar() {

        let produto = this.lerDados();

        if (this.validaCampos(produto)) { 

            if(this.editId == null) {
                this.adicionar(produto); 
            }
            else {
                this.atualizar(this.editId, produto);
            }

                 
        }
        //  console.log(produto);
        // console.log(this.arrayProdutos);
        
        this.listaTabela();
        this.limpar();
    } 

        listaTabela(){
            let tbody = document.getElementById('tbody');
            tbody.innerText = '';

            let valorTotalGeral = 0;
            

            for(let i = 0; i < this.arrayProdutos.length; i++ ) {
                let tr = tbody.insertRow();

                let td_id = tr.insertCell();
                let td_produto = tr.insertCell();
                let td_embalagem = tr.insertCell();
                let td_segmento = tr.insertCell();
                let td_volume = tr.insertCell();
                let td_fornecedor = tr.insertCell();
                let td_valorunitario = tr.insertCell();
                let td_unidade = tr.insertCell();
                let td_valortotal = tr.insertCell();
                let td_vencimento = tr.insertCell();
                let td_acoes = tr.insertCell();
                // console.log (td_id,td_commoditie,td_precosc)


                td_id.innerText = this.arrayProdutos[i].id;     
                td_produto.innerText = this.arrayProdutos[i].produto;
                td_embalagem.innerText = this.arrayProdutos[i].embalagem;
                td_segmento.innerText = this.arrayProdutos[i].segmento;
                td_volume.innerText = this.arrayProdutos[i].volume.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                td_fornecedor.innerText = this.arrayProdutos[i].fornecedor;
                td_valorunitario.innerText = this.arrayProdutos[i].valorunitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                td_unidade.innerText = this.arrayProdutos[i].unidade;
              
                td_valortotal.innerText = this.arrayProdutos[i].valortotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        valorTotalGeral += this.arrayProdutos[i].valortotal;

                const data = new Date(this.arrayProdutos[i].vencimento);
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = data.getFullYear();
                const dataFormatada = `${dia}-${mes}-${ano}`;
                td_vencimento.innerText = dataFormatada;    
        
{/* <i class="fa-solid fa-pen-to-square"></i> */}
                let iconEdit = document.createElement('i');
                iconEdit.classList.add('fas', 'fa-pen-to-square', 'icon');
                iconEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");

                let iconDelete = document.createElement('i');
                iconDelete.classList.add('fas', 'fa-trash', 'icon');
                iconDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");

                td_acoes.appendChild(iconEdit);
                td_acoes.appendChild(iconDelete);
              
            }
            // criando uma nova linha para o valor total geral
    let tr = tbody.insertRow();
    

      // criando a célula com o texto "valorTotalGeral"
      let td_total = tr.insertCell();
      td_total.innerText = "Valor Total Geral";

    // criando as células vazias antes do valor total geral
    let td_empty1 = tr.insertCell();
    td_empty1.colSpan = 7;

    // criando a célula com o valor total geral
    let td_total_value = tr.insertCell();
    td_total_value.innerText = valorTotalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // criando as células vazias depois do valor total geral
    let td_empty2 = tr.insertCell();
    td_empty2.colSpan = 1;
    // <i class="fa-regular fa-download"></i>
    let td_icon = tr.insertCell();
    td_icon.innerHTML = '<i class="fa-solid fa-download"></i>';
    // adicionando classe CSS à última linha
    tr.classList.add('total-row');
    

           
        }

    adicionar(produto) {
        
        // produto.produto = parseFloat(produto.produto);
        // produto.embalagem = parseFloat(produto.embalagem);
        // produto.segmento = parseFloat(produto.segmento);
        produto.volume = parseFloat(produto.volume);
        // produto.fornecedor = parseFloat(produto.fornecedor);
        produto.valorunitario = parseFloat(produto.valorunitario);
        produto.valortotal = parseFloat(produto.volume * produto.valorunitario);

        // produto.vencimento = parseFloat(produto.vencimento);
        this.arrayProdutos.push(produto);
        this.id++;

  
    }

    atualizar(id, produto) {

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id ) {
    
                this.arrayProdutos[i].produto = produto.produto;
                this.arrayProdutos[i].embalagem = produto.embalagem;
                this.arrayProdutos[i].segmento = produto.segmento;
                this.arrayProdutos[i].volume = produto.volume;
                this.arrayProdutos[i].fornecedor = produto.fornecedor;
                this.arrayProdutos[i].valorunitario = produto.valorunitario;
                this.arrayProdutos[i].unidade = produto.unidade;
                // this.arrayProdutos[i].valortotal = produto.valortotal;
                this.arrayProdutos[i].vencimento = produto.vencimento;

            }
        }

           

    }
    
    lerDados() {

        let produto = {};

        produto.id = this.id;
        produto.produto = document.getElementById('produto').value;
        // produto.produto = retornaOption('produto');
        produto.embalagem = document.getElementById('embalagem').value;
        produto.segmento = document.getElementById('segmento').value;
        produto.volume = document.getElementById('volume').value;
        produto.fornecedor = document.getElementById('fornecedor').value;
        produto.valorunitario = document.getElementById('valorunitario').value;
        produto.unidade = document.getElementById('unidade').value;
      
        let volume = parseFloat(produto.volume);
        let valorUnitario = parseFloat(produto.valorunitario);
        let valorTotal = volume * valorUnitario;

        produto.valortotal = valorTotal.toFixed(2);
        produto.vencimento = document.getElementById('vencimento').value;
        

        //console.log(produto);

        return produto; 
        
    }


    validaCampos(produto) {
        let msg ='';
        if(produto.produto == ""){
            msg += ' - selecione o nome do produto \n'
        }
        if(produto.embalagem == ""){
            msg += '- selecione o tipo da embalagem \n'
        }
        if(produto.segmento == ""){
            msg += ' - selecione o tipo do segmento \n'
        }
        if(produto.volume == ""){
            msg += ' - digite a quantidade do produto \n'
        }
        if(produto.fornecedor == ""){
            msg += ' - selecione o nome da fornecedor \n'
        }
        if(produto.valorunitario == ""){
            msg += ' - digite o valor unitario do produto \n'
        }
        if(produto.unidade == ""){
            msg += ' - selecione a unidade do produto (embalagem) \n'
        }
        if(produto.vencimento == ""){
            msg += ' - selecione a data do vencimento da compra \n'
        }
        // if(produto.precokg == ""){
        //     msg += 'informe o preço por kg commoditie \n'
        // }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    }
 
    // adicionar () {
    //     this.arrayProdutos.push(produto);
    //     console.log(this.arrayProdutos)
    // }
 
    // edit() {
    //     alert('editttttt');

    //     // let produto = this.lerDados();
    //     // console.log(produto);
    // } 
        
    
    limpar() {
        document.getElementById('produto').value = 'Produto';
        document.getElementById('embalagem').value = 'Embalagem';
        document.getElementById('segmento').value = 'Segmento';
        document.getElementById('volume').value = '';
        document.getElementById('fornecedor').value = 'Fornecedor';
        document.getElementById('valorunitario').value = '';
        document.getElementById('unidade').value = 'Unidade';
        // document.getElementById('valortotal').value = '';
        document.getElementById('vencimento').value = '';
       

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }
    deletar(id) {
        
        let tbody = document.getElementById('tbody');

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if ( this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }

    preparaEdicao(dados) {
        
        this.editId = dados.id;
        document.getElementById('produto').value = dados.produto;
        document.getElementById('embalagem').value = dados.embalagem;
        document.getElementById('segmento').value = dados.segmento;
        document.getElementById('volume').value = dados.volume;
        document.getElementById('fornecedor').value = dados.fornecedor;
        document.getElementById('valorunitario').value = dados.valorunitario;
        document.getElementById('unidade').value = dados.unidade;
        // document.getElementById('valortotal').value = dados.valortotal;
        document.getElementById('vencimento').value = dados.vencimento;

        document.getElementById('btn1').innerText = 'Atualizar';
        
    }
}

var produto = new Produto();
