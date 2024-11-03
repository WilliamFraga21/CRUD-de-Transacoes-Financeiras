<?php

namespace App\Http\Controllers;

use App\Actions\DeleteTransacoesAction;
use App\Actions\GetTransacoesByIdAction;
use App\Actions\GetAllTransacoesAction;
use App\Actions\GetTransacoesReportAction;
use App\Actions\TransacoesCreateAction;
use App\Actions\TransacoesUpdateAction;
use App\Http\Requests\TransacoesRequest;
use App\Repositories\TransacoesRepository;
use Illuminate\Http\Request;

class TransacoesController
{


    public function __construct(
        private readonly TransacoesRepository $transacoesRepository
    )
    {
    }


    public function store(
        TransacoesCreateAction $transacoesCreateAction,
        TransacoesRequest $transacoesRequest
    ){

        try {

            $data = $transacoesCreateAction->execute(
                $transacoesRequest,
                $this->transacoesRepository
            );

            logger()->info('Transação Criada com sucesso id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }




    public function update(
        TransacoesUpdateAction $transacoesUpdateAction,
        TransacoesRequest $transacoesRequest,
        $id
    ){

        try {

            $data = $transacoesUpdateAction->execute(
                $transacoesRequest,
                $this->transacoesRepository,
                $id
            );

            logger()->info('Transação atualizada com sucesso id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }


    public function all(
        GetAllTransacoesAction $getAllTransacoesAction,
        Request $request
    ){

        try {

            $data = $getAllTransacoesAction->execute(
                $request->only('type'),
                $this->transacoesRepository,
            );

            logger()->info('Transação coletada id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }


    public function delete(
        DeleteTransacoesAction $deleteTransacoesAction,
                               $id
    ){

        try {

            $data = $deleteTransacoesAction->execute(
                null,
                $this->transacoesRepository,
                $id
            );

            logger()->info('Transação deletada com sucesso  id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }



    public function filtrer(
        GetTransacoesByIdAction $filtroTransacoesAction,
                                $id
    ){

        try {

            $data = $filtroTransacoesAction->execute(
                null,
                $this->transacoesRepository,
                $id
            );

            logger()->info('Transação Filtrada com sucesso id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }


    public function report(
        GetTransacoesReportAction $getTransacoesReportAction,
        Request $request
    ){

        try {

            $data = $getTransacoesReportAction->execute(
                $request->only('date'),
                $this->transacoesRepository,
            );

            logger()->info('Transação coletada');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }

}
