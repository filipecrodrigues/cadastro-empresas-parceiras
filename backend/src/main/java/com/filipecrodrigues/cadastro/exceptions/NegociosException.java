package com.filipecrodrigues.cadastro.exceptions;

// Exception personalizada para regras de negócio
public class NegociosException extends RuntimeException {

    public NegociosException(String mensagem) {
        super(mensagem);
    }
}
