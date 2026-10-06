TAMANHOS = ("PP", "P", "M", "G", "GG")


class Produto:
    def __init__(self, nome, preco, tamanho):
        if not nome or not nome.strip():
            raise ValueError("nome do produto não pode ser vazio")
        if preco <= 0:
            raise ValueError("preço deve ser maior que zero")
        if tamanho not in TAMANHOS:
            raise ValueError(f"tamanho inválido: {tamanho}")
        self.nome = nome.strip()
        self.preco = preco
        self.tamanho = tamanho

    def descricao(self):
        return f"{self.nome} {self.tamanho}: R$ {self.preco:.2f}"
    import pytest

from loja.produto import Produto


def test_produto_valido():
    camiseta = Produto("Camiseta básica", 39.90, "M")
    assert camiseta.descricao() == "Camiseta básica M: R$ 39.90"


def test_preco_zero_nao_e_aceito():
    with pytest.raises(ValueError):
        Produto("Camiseta básica", 0, "M")


def test_nome_vazio_nao_e_aceito():
    with pytest.raises(ValueError):
        Produto("", 39.90, "M")


def test_tamanho_invalido_nao_e_aceito():
    with pytest.raises(ValueError):
        Produto("Camiseta básica", 39.90, "XG")