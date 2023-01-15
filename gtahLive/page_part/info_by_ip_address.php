<?PHP

function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
$ipdat = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=" . getRealIpAddr()));
if (@strlen(trim($ipdat->geoplugin_countryCode)) == 2) {
  $country_by_ip =  @$ipdat->geoplugin_countryName;
  $currencyCode_by_ip = @$ipdat->geoplugin_currencyCode;
  $countryCode_by_ip =  @$ipdat->geoplugin_countryCode;
  $countrytimezone =  @$ipdat->geoplugin_timezone;
}

?>