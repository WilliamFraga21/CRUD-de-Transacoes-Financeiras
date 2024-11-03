<?php

namespace App\Repositories;

use App\Models\Transacoes;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransacoesRepository implements \App\Contracts\RepositoryInterface
{

    public function getAll(array $params)
    {
        $transacao= Transacoes::all();

        if (count($transacao)===0){
            throw new ModelNotFoundException("Nenhuma Transação Cadastrada até o Momento!!");
        }else{

            return $transacao;
        }

        // TODO: Implement getAll() method.
    }

    public function getById(int $id)
    {

        $transacao = Transacoes::where("tipo_id", $id)->get();

        if (count($transacao)===0){
            throw new ModelNotFoundException("Tipo não encontrado com o ID {$id}");
        }else{

            return $transacao;
        }
    }


    public function store(array $data)
    {

        return Transacoes::firstOrCreate(
            [
                'tipo_id' => $data['tipo_id'],
                'descricao' => $data['descricao'],
                'valor' => $data['valor'],
                'data' => $data['data'],
                'categoria_id' => $data['categoria_id'],

            ],
            $data
        );        // TODO: Implement store() method.
    }

    public function update(int $id, array $data)
    {


        try {
            $transacao = Transacoes::findOrFail($id);
            $transacao->update($data);

            $att = "Atualizado com sucesso";
            return $att;
        } catch (ModelNotFoundException $e) {
            throw new \Exception("Transação com o ID {$id} não foi encontrada.");
        }

        // TODO: Implement update() method.
    }

    public function delete(int $id)
    {
        try {
            $transacao = Transacoes::findOrFail($id);
            return $transacao;
        } catch (ModelNotFoundException $e) {
            throw new \Exception("Transação com o ID {$id} não foi encontrada.");
        }
        // TODO: Implement delete() method.
    }
}
