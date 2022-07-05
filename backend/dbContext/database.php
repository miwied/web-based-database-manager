<?php
class Database
{
    protected $pdo = null;
    public function __construct()
    {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_DATABASE_NAME;
        $this->pdo = new PDO($dsn, DB_USERNAME, DB_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    }

    public function query($sql)
    {
        $stmt = $this->pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    // public function queryWithParams($sql, $params)
    // {
    //     $kvps = array();
    //     $where = ' WHERE ';
    //     for ($i = 0; $i < count($params); $i++) {
    //         $where .= key($params[$i]) . ' = ' . ':' . key($params[$i]);
    //         if ($i < count($params) - 1) {
    //             $where .= ' AND ';
    //         }
    //         array_push($kvps, [':' . key($params[$i]) => $params[$i][key($params[$i])]]);
    //     }
    //     $sql .= $where;
    //     $stmt = $this->pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
    //     $stmt->execute($kvps[0]);
    //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     return $result;
    // }

    public function queryWithParams($sql, $params)
    {
        $stmt = $this->pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_SCROLL));
        $stmt->execute($params);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function executeWithParams($sql, $params)
    {
        $this->pdo->prepare($sql)->execute($params);
    }
}
