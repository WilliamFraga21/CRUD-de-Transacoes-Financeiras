<?php

namespace App\Repositories;

use App\Models\Categoria;

class CategoriaRepository implements \App\Contracts\RepositoryInterface
{

    public function getAll(array $params)
    {
        // TODO: Implement getAll() method.
    }

    public function getById(int $id)
    {
        // TODO: Implement getById() method.
    }

    public function store(array $data)
    {
        return Categoria::firstOrCreate(
            [
                'categoria' => $data['categoria'],

            ],
            $data
        );
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
