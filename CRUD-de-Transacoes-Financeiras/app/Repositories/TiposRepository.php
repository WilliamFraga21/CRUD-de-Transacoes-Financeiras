<?php

namespace App\Repositories;

use App\Models\Tipos;

class TiposRepository implements \App\Contracts\RepositoryInterface
{

    public function getAll(array $params)
    {
        return Tipos::all();
        // TODO: Implement getAll() method.
    }

    public function getById(int $id)
    {
        // TODO: Implement getById() method.
    }

    public function store(array $data,)
    {

        return Tipos::create($data);


        // TODO: Implement store() method.
    }

    public function update(int $id, array $data)
    {
        // TODO: Implement update() method.
    }

    public function delete(int $id)
    {
        // TODO: Implement delete() method.
    }
}
