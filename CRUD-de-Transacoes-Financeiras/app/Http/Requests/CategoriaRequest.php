<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoriaRequest extends  FormRequest
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
    public function rules(): array
    {
        return [
            //

            'categoria' => 'required|string|max:100'

        ];
    }


    public function messages()
    {
        return [
            'categoria.required' => 'A categoria é obrigatória.',
            'categoria.string' => 'A categoria deve ser um texto.',
            'categoria.max' => 'A categoria não pode exceder 255 caracteres.',

        ];
    }
}
