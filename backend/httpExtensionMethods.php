<?php
class HttpExtensionMethods
{
    /**
     * Get URI elements.
     * 
     * @return array
     */
    public static function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);

        return $uri;
    }

    /**
     * Send API output.
     *
     * @param mixed  $data
     * @param string $httpHeader
     */
    public static function sendOutput($data, $httpHeaders = array())
    {
        header_remove('Set-Cookie');

        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }

        echo $data;
        exit;
    }

    // function for throwing a http 404 error  
    public static function throw404Error()
    {
        header("HTTP/1.1 404 Not Found");
        exit();
    }
}
