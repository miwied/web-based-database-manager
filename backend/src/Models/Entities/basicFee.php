<?php
class basicFee
{
    // Variables
    private $id;
    private $group;
    private $basicFee;

    function __construct($_id, $_group, $_basicFee)
    {
        $this->id = $_id;
        $this->group = $_group;
        $this->basicFee = $_basicFee;
    }

    // Methods
    function getId()
    {
        return $this->id;
    }
    function getGroup()
    {
        return $this->group;
    }
    function getBasicFee()
    {
        return $this->basicFee;
    }
}
