<?php

namespace App\Service;

use DateTime;
use DateTimeImmutable;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\ParameterType;
use Doctrine\DBAL\Types\DateType;
use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Types\Types;

class UriReaderService
{
    public function parse(array $params, $validateparam, $table = "exp"): array
    {
        // ->where('exp.nbr_participant < :nbr_participant')
        // ->setParameter('nbr_participant', 20)



        $operators = [];

        $operators["eq"] = "="; // =	Equal
        $operators["seq"] = "<=>"; // <=>	Equal (Safe to compare NULL values)
        $operators["neq"] = "!="; // !=	Not Equal
        $operators["gt"] = ">"; // >	Greater Than
        $operators["dgt"] = ">"; // >	Greater Than
        $operators["gte"] = ">="; // >=	Greater Than or Equal
        $operators["dgte"] = ">="; // >=	Greater Than or Equal
        $operators["lt"] = "<"; // <	Less Than
        $operators["dlt"] = "<"; // <	Less Than
        $operators["lte"] = "<="; // <=	Less Than or Equal
        $operators["dlte"] = "<="; // <=	Less Than or Equal
        $operators["in"] = "IN("; // IN ( )	Matches a value in a list
        $operators["not"] = "not"; // NOT	Negates a condition
        $operators["is"] = "="; //  condition
        // $operastor["between"]="=";// BETWEEN	Within a range (inclusive)
        $operators["isn"] = "IS NULL"; // IS NULL	NULL value
        $operators["isnn"] = "IS NOT NULL"; // IS NOT NULL	Non-NULL value
        $operators["like"] = "like"; // LIKE	Pattern matching with % and _

        $result = [];


        ///// where close


        $k = 1;
        foreach ($params as $key => $value) {
            $result["sort_by"] = "id";
            $result["order_by"] = "asc";
            if (!in_array($key, $validateparam)) {;
            } elseif ($key == "page") {
                $result["page"] = $value;
            } elseif ($key == "sort_by") {
                $result["sort_by"] = "$table \." . $value;
            } elseif ($key == "order_by") {
                $result["order_by"] = in_array(strtolower($value), ["desc", "asc"]) ? $value : "asc";
            } elseif (is_array($value)) {

                foreach ($value as $op => $v) {
                    $operator = $operators[$op];
                    $startoperator = ($op == "in") ? "(" : ":";
                    $endoperator = ($op == "in") ? ")" : "";
                    $column = "$table.$key";
                    $valeur = "$startoperator$key$op$endoperator";
                    $result["where"][] =  "$column $operator $valeur";
                    if ($op == "in") {
                        $result["params"][$key . $op] =  [explode(',', $v), Connection::PARAM_STR_ARRAY];
                    } elseif (in_array($op,["dgt","dlt"])) {
                        $result["params"][$key . $op] =  [$v, ParameterType::STRING];
                    } else {
                        $result["params"][$key . $op] = ($op) == "like" ? ["%$v%", ParameterType::STRING] : [$v, ParameterType::INTEGER];
                    }
                    $k++;
                }
            } else {
                $result["where"][] =  "$table.$key = :" . $key;
                $result["params"][$key] =  [$value, null];
            }
        }
        // dd($result);
        return $result;
    }
}
