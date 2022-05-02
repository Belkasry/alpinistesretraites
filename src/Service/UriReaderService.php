<?php

namespace App\Service;

class UriReaderService
{
    public function parse(array $params, $validateparam, $table = "exp"): array
    {
        // ->where('exp.nbr_participant < :nbr_participant')
        // ->setParameter('nbr_participant', 20)



        $operators = [];

        $operators["eq"] = [" = ", ""]; // =	Equal
        $operators["seq"] = [" <=> ", ""]; // <=>	Equal (Safe to compare NULL values)
        $operators["neq"] = [" != ", ""]; // !=	Not Equal
        $operators["gt"] = [" > ", ""]; // >	Greater Than
        $operators["gte"] = [" >= ", ""]; // >=	Greater Than or Equal
        $operators["lt"] = [" < ", ""]; // <	Less Than
        $operators["lte"] = [" <= ", ""]; // <=	Less Than or Equal
        $operators["in"] = [" IN( ", " ) "]; // IN ( )	Matches a value in a list
        $operators["not"] = [" not ", ""]; // NOT	Negates a condition
        // $operastor["between"]=" = ";// BETWEEN	Within a range (inclusive)
        $operators["isn"] = [" IS NULL ", ""]; // IS NULL	NULL value
        $operators["isnn"] = [" IS NOT NULL ", ""]; // IS NOT NULL	Non-NULL value
        $operators["like"] = [" like %", "%"]; // LIKE	Pattern matching with % and _

        $result = [];


        ///// where close
        foreach ($params as $key => $value) {
            $result["sort_by"]="id";
            $result["order_by"]="asc";

            if (!in_array($key, $validateparam)) {;
            } elseif ($key == "page") {
                $result["page"] = $value;
            } elseif ($key == "sort_by") {
                $result["sort_by"] = "$table \." . $value;
            } elseif ($key == "order_by") {
                $result["order_by"] = in_array(strtolower($value), ["desc", "asc"]) ? $value : "asc";
            } elseif (is_array($value)) {
                foreach ($value as $op => $v) {
                    $result["where"][] =  "$table.$key " . $operators[$op][0] . ":" . $key . $op . "" . $operators[$op][1];
                    if (($op) == "in") {
                        $result["params"][$key . $op] =  explode(',', $v);
                    } else {
                        $result["params"][$key . $op] =  $v;
                    }
                }
            } else {
                $result["where"][] =  "$table.$key = :" . $key;
                $result["params"][$key] =  $value;
            }
        }
        return $result;
    }
}
