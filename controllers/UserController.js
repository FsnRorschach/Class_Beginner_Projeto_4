class UserController {

    constructor(formID, tableID){

        this.formEl = document.getElementById(formID);
        this.tableID = document.getElementById(tableID);

        this.onSubmit();
    }

    onSubmit(){

        this.formEl.addEventListener("submit", (event)=>{

            //event. prevente default previne o comportamento padrão do formulario, nesse caso era enviar os dados pela URL quando desse submit no button
            event.preventDefault();

            this.addLinhasTab(this.getValues());

        });    
    }

    onBlurCep(value){

        this.formEl.onblur(this.pesquisacep(value));       

    }

    getValues(){

        let user = {};

        console.log(typeof this.formEl.elements);

        // forEach para trazer todos os campos do formulario
        this.formEl.elements.forEach(function(campo, index){
        
            user[campo.name] = campo.value;
            
        });

       return new User(
            user.name,
            user.email,
            user.telefone,
            user,cep,
            user.rua,
            user.numero,
            user.complemento,
            user.bairro,
            user.cidade,
            user.uf,
            user.dataCadastro
        );
    }

    addLinhasTab(dadosUser){

        // usar o template string `` que são o prorio codigo dentro da crase sem a necessidade de concatenar
        this.tableEl.innerHTML = `
            <tr>
                <td><img src="" alt="User Image" class=""></td>
                <td>${dadosUser.nome}</td>
                <td>${dadosUser.email}</td>
                <td>${dadosUser.telefone}</td>
                <td>${dadosUser.cep}</td>
                <td>${dadosUser.rua}</td>
                <td>${dadosUser.numero}</td>
                <td>${dadosUser.complemento}</td>
                <td>${dadosUser.bairro}</td>
                <td>${dadosUser.cidade}</td>
                <td>${dadosUser.uf}</td>
                <td>${dadosUser.dataCadastro}</td>
                    <td>
                        <button type="button" class"btn btn-primary btn-xs btn-flat">Editar</button>
                        <button type="button" class"btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
            </tr>
        `; 
    }

    data(){

        var horas = new Date();
    
        document.getElementById("dataCadastro").value = horas.toLocaleDateString();
        
    }

    /*-------------Aqui começa o Busca Cep---------------------------- */


    limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");    
    }

    meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);  
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');
        
        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";
            
                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    } 
    /*-----------Termina Busca CEP-------------------------------------*/
}