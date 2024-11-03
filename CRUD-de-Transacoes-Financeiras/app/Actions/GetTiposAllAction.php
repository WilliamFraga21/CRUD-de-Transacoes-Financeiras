<?php

namespace App\Actions;

use App\Contracts\RepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\ValidatedInput;
use Symfony\Component\HttpFoundation\InputBag;

class GetTiposAllAction implements \App\Contracts\ActionInterface
{

    public function execute(InputBag|array|ValidatedInput|Request|null $request, ?RepositoryInterface $repository, ?int $id = null): mixed
    {
        return $repository->getAll([]);
    }
}
