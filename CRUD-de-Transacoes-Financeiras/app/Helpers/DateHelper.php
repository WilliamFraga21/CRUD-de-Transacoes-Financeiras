<?php

namespace App\Helpers;

use Carbon\Carbon;

class DateHelper
{
    public static function getDateRange(?string $data, bool $strict = false): array
    {
        $dataInicio = Carbon::now()->subYears(3)->format('Y-m-d H:i:s');
        $dataFinal = Carbon::now()->addDays(2)->format('Y-m-d H:i:s');

        if ($data === null) return [$dataInicio, $dataFinal];

        [$startDateRaw, $endDateRaw] = explode(' - ', $data);

        if ($strict && $startDateRaw === $endDateRaw) return [$dataInicio, $dataFinal];

        $startDate = Carbon::createFromFormat('d/m/Y', $startDateRaw)->startOfDay();
        $endDate = Carbon::createFromFormat('d/m/Y', $endDateRaw)->endOfDay();

        return [$startDate, $endDate];
    }
}
