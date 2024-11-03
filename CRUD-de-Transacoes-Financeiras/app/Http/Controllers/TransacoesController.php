<?php

namespace App\Http\Controllers;

use App\Actions\DeleteTransacoesAction;
use App\Actions\FiltroTransacoesAction;
use App\Actions\GetAllTransacoesAction;
use App\Actions\TransacoesCreateAction;
use App\Actions\TransacoesUpdateAction;
use App\Http\Requests\TransacoesRequest;
use App\Repositories\TransacoesRepository;

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

            logger()->info('account created with id="' . $data . '"');
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

            logger()->info('account created with id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }


    public function all(
        GetAllTransacoesAction $getAllTransacoesAction,
    ){

        try {

            $data = $getAllTransacoesAction->execute(
                null,
                $this->transacoesRepository,
            );

            logger()->info('account created with id="' . $data . '"');
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

            logger()->info('account created with id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }



    public function filtrer(
        FiltroTransacoesAction $filtroTransacoesAction,
                               $id
    ){

        try {

            $data = $filtroTransacoesAction->execute(
                null,
                $this->transacoesRepository,
                $id
            );

            logger()->info('account created with id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }

}
