<?php

namespace App\Http\Controllers;

use App\Actions\GetTiposAllAction;
use App\Actions\TiposCreateAction;
use App\Http\Requests\TiposRequest;
use App\Repositories\TiposRepository;

class TiposController
{

    public function __construct(
        private readonly TiposRepository $tiposRepository
    )
    {
    }

    public function store(
        TiposCreateAction $tiposCreateAction,
        TiposRequest $tiposRequest
    ){

        try {

            $data = $tiposCreateAction->execute(
                $tiposRequest,
                $this->tiposRepository
            );

            logger()->info('account created with id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }


    public function all(
        GetTiposAllAction $getTiposAllAction,

    ){

        try {

            $data = $getTiposAllAction->execute(
                null,
                $this->tiposRepository
            );

            logger()->info('account created with id="' . $data . '"');
            return response()->json(['success' => true, 'data' => $data]);
        }catch (\Exception $e){
            logger()->error($e);
            return response()->json(['error' => ['details' => $e->getMessage(), 'file' => $e->getFile(), 'line' => $e->getLine()]], 400);
        }

    }




}
