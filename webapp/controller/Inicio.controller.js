sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("projetonetflix.controller.Inicio", {
        onInit: function () {
            //NOMENCLATURA
            let sNome = 'Cristiano'
            let aLista = [];
            let oUser = {};
            //definicao de lista vaziade resultados
            let resultados = {
                titles: []
            }

            //definicao de modelo - variavel para mostrar dados na tela 
            let resultadosModel = new JSONModel();
            //atribuicao de dados
            resultadosModel.setData(resultados);
            //anexar modelo na tela
            let tela = this.getView();
            tela.setModel(resultadosModel, "APINetflix");
        },
        onInicioLinkPress: function(){
            alert("navegar para a tela inicial");
        },
        onBuscarDados: function(){
            //busca de dados ma api da netflix
            let searchField = this.byId("idSearchField");
            let filtro = searchField.getValue();

            alert(filtro);

            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query='
                + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'b0ec963a81mshdf723014243b499p15d3e4jsn926bd192c9dd',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                //RESGATAR O MODELO E ATUALIZAR OS DADOS

                let tela = this.getView();
                let modelo = tela.getModel("APINetflix");
                let dados = modelo.getData();

                //limpar a lista
                dados.titles = [];
                dados.titles = response.titles;
                modelo.refresh();

                //Ler dados fora da funcao assiando-a a tela principal
            }.bind(this));
        }
    });
});
