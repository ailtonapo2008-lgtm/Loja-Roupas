import pytest
from sqlmodel import Session

from loja.banco import criar_tabelas, engine_em_memoria
from loja.repositorio import RepositorioProdutos
from loja.servico import (DadosInvalidos, ProdutoJaExiste, ProdutoNaoEncontrado,
                          ServicoCatalogo)

CAMISETA = {"tipo": "Camiseta", "nome": "Camiseta básica", "preco": 39.90,
            "tamanho": "M", "manga": "curta"}
CALCA = {"tipo": "Calca", "nome": "Calça jeans", "preco": 129.90,
         "tamanho": "G", "modelagem": "reta"}


@pytest.fixture
def servico():
    """Cada teste ganha um banco novo, só na memória."""
    engine = engine_em_memoria()
    criar_tabelas(engine)
    with Session(engine) as sessao:
        yield ServicoCatalogo(RepositorioProdutos(sessao))


def test_cadastrar_devolve_o_produto_com_id(servico):
    resultado = servico.cadastrar(CAMISETA)
    assert resultado["id"] == 1
    assert resultado["nome"] == "Camiseta básica"


def test_nome_repetido_nao_entra(servico):
    servico.cadastrar(CAMISETA)
    with pytest.raises(ProdutoJaExiste):
        servico.cadastrar(CAMISETA)


def test_regra_do_dominio_vira_dados_invalidos(servico):
    with pytest.raises(DadosInvalidos):
        servico.cadastrar({**CAMISETA, "preco": 0})


def test_tipo_desconhecido_e_invalido(servico):
    with pytest.raises(DadosInvalidos):
        servico.cadastrar({**CAMISETA, "tipo": "Sapato"})


def test_buscar_inexistente(servico):
    with pytest.raises(ProdutoNaoEncontrado):
        servico.buscar(99)


def test_atualizar_mantem_o_proprio_nome_mas_nao_o_de_outro(servico):
    servico.cadastrar(CAMISETA)
    servico.cadastrar(CALCA)
    assert servico.atualizar(1, {**CAMISETA, "preco": 49.90})["preco"] == 49.90
    with pytest.raises(ProdutoJaExiste):
        servico.atualizar(2, {**CALCA, "nome": "Camiseta básica"})


def test_remover_e_remover_de_novo(servico):
    servico.cadastrar(CAMISETA)
    servico.remover(1)
    with pytest.raises(ProdutoNaoEncontrado):
        servico.remover(1)