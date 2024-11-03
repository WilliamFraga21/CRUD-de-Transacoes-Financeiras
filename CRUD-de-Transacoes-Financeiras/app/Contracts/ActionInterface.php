<?php

namespace App\Contracts;

use Illuminate\Http\Request;
use Illuminate\Support\ValidatedInput;
use Symfony\Component\HttpFoundation\InputBag;

interface ActionInterface
{
    public function execute(Request|InputBag|ValidatedInput|array|null $request, ?RepositoryInterface $repository , ?int $id = null): mixed;
}
