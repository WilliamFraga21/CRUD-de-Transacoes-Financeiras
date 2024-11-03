<?php

namespace App\Http\Controllers;

use App\Actions\CategoriaCreateAction;
use App\Http\Requests\CategoriaRequest;
use App\Repositories\CategoriaRepository;

class CategoriaController
{


    public function __construct(
        private readonly CategoriaRepository $categoriaRepository
    )
    {
    }

    public function store(
        CategoriaCreateAction $categoriaCreateAction,
        CategoriaRequest $categoriaRequest
    ){

        try {

            $data = $categoriaCreateAction->execute(
                $categoriaRequest,
                $this->categoriaRepository
            );

            logger()->info('Categoria Criada com sucesso id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }



}
