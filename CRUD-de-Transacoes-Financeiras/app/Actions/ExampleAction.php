<?php

namespace App\Actions;

use App\Contracts\RepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\ValidatedInput;
use Symfony\Component\HttpFoundation\InputBag;

class ExampleAction implements \App\Contracts\ActionInterface
{

    public function execute(InputBag|ValidatedInput|array|Request|null $request, ?RepositoryInterface $repository, ?int $id = null): mixed
    {
        // TODO: Implement execute() method.


        try {


            //imagina que antes disso tem qualquer regra de negocio

            $dadosDeposDaTratativaDeRegra=$request->all();


            return $dadosDeposDaTratativaDeRegra;





//        return $repository->store($request->all());


        }catch (\Exception $e){
            throw $e;
        }





    }
}
