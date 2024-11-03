<?php

namespace App\Contracts;


interface RepositoryInterface
{
    public function getAll(array $params);
    public function getById(int $id);
    public function store(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
