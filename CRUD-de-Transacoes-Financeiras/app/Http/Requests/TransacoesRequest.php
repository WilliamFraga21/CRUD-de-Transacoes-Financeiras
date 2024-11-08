<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransacoesRequest extends FormRequest
{


    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'descricao' => 'required|string|max:255',
            'valor' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'data' => 'required|date',
            'tipo_id' => 'required|integer',

            'categoria_id' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'descricao.required' => 'A descrição é obrigatória.',
            'descricao.string' => 'A descrição deve ser um texto.',
            'descricao.max' => 'A descrição não pode exceder 255 caracteres.',
            'valor.required' => 'O valor é obrigatório.',
            'valor.numeric' => 'O valor deve ser um número.',
            'valor.regex' => 'O valor deve ser um número decimal válido com até duas casas decimais.',
            'data.required' => 'A data é obrigatória.',
            'data.date' => 'A data deve ser uma data válida.',
            'tipo_id.required' => 'O tipo ID é obrigatório.',
            'tipo_id.integer' => 'O tipo ID deve ser um número inteiro.',
            'categoria_id.required' => 'O categoria ID é obrigatório.',
            'categoria_id.integer' => 'O categoria ID deve ser um número inteiro.',

        ];
    }

}
