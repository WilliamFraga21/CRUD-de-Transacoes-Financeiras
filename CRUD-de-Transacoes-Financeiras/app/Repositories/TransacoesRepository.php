<?php

namespace App\Repositories;

use App\Helpers\DateHelper;
use App\Models\Transacoes;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransacoesRepository implements \App\Contracts\RepositoryInterface
{

    public function getAll(array $params)
    {
        if (!isset($params['type']))  return Transacoes::join('tipo', 'transacoes.tipo_id', '=', 'tipo.id')->join('categoria','transacoes.categoria_id','categoria.id')->get();

        return Transacoes::join('tipo', 'transacoes.tipo_id', '=', 'tipo.id')
            ->join('categoria','transacoes.categoria_id','categoria.id')
            ->where('transacoes.tipo_id', $params['type'])
            ->get();
    }

    public function getById(int $id)
    {
        return Transacoes::findOrFail($id);
    }

    public function store(array $data)
    {


        if ($data['tipo_id'] === 1){
            $data['valor'] = -abs($data['valor']);
            return Transacoes::firstOrCreate(
                [
                    'tipo_id' => $data['tipo_id'],
                    'descricao' => $data['descricao'],
                    'valor' => $data['valor'],
                    'data' => $data['data'],
                    'categoria_id' => $data['categoria_id'],

                ],
                $data
            );
        }else{

            return Transacoes::firstOrCreate(
                [
                    'tipo_id' => $data['tipo_id'],
                    'descricao' => $data['descricao'],
                    'valor' => $data['valor'],
                    'data' => $data['data'],
                    'categoria_id' => $data['categoria_id'],

                ],
                $data
            );
        }





    }

    /**
     * @throws \Exception
     */
    public function update(int $id, array $data)
    {
        try {
            $transacao = Transacoes::findOrFail($id);
            $transacao->update($data);
            return "Atualizado com sucesso";
        } catch (ModelNotFoundException $e) {
            throw new \Exception("Transação com o ID {$id} não foi encontrada.");
        }
    }

    /**
     * @throws \Exception
     */
    public function delete(int $id)
    {
        try {
            return Transacoes::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new \Exception("Transação com o ID {$id} não foi encontrada.");
        }
    }

    public function report(array $params)
    {
        [$startDate, $endDate] = DateHelper::getDateRange($params['date']);

        $baseQuery =  Transacoes::whereBetween('data', [$startDate, $endDate]);


        $amount2 = (clone $baseQuery)->where('tipo_id', 1)->sum('valor');
        $amount = (clone $baseQuery)->where('tipo_id', 2)->sum('valor');
        $qtd = $baseQuery->count('id'); // Aqui não há necessidade de clonar, pois não há `where` extra.

        return [
            'amount2' => $amount+$amount2,
            'amount' => $amount,
            'qtd' => $qtd ?? 0
        ];
    }
}
