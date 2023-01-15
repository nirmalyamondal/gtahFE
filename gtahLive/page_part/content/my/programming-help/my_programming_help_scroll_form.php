<div class="main-wrapper hide_at_mobile hide_by_default deepyellow_colorbg scroll_form white_text">
      <div class="container-fluid pt-1 pb-1">
        <div class="row">
          <div class="col-5"> 
            <span class="instahelp_onscroll">For Instant Help & A+ Grade Upload Assignment</span>
          </div>
          <div class="col-4"> 
            <span id="error_missing_fileds"></span>
          </div>
          <div class="col-3">
            <div class="row align-items-end">
              <div class="col-2">&nbsp;</div>
                  <div class="col-4"> 
                    <div class="step_1_labelm"><span class="h5 text_left white_text">Step 1</span></div>                      
              </div>
              <div class="col-2">
                <img src="images/lineArrow.webp" width="35px" height="15px" alt="Form step 1 to step 2" class="img-fluid step1_2_arrow">
              </div>
              <div class="col-4">
                <div class="step_2_labelm"><span class="h5 text_left yellow_text">Step 2</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-wrapper hide_at_mobile hide_by_default yellow_cologbg scroll_form white_text">
      <div class="container-fluid">
          <div class="row align-items-end">
          <div class="form_home_wrap">
            <form id="helpFormScroll" name="helpForm" action="https://www.gotoassignmenthelp.com/next-step.php" method="post" enctype="multipart/form-data" accept-charset="utf-8" class="form form_home">
              <div class="row">
                    <div class="col-3"> 
                  <input id="emails" name="email" type="text" value="" placeholder="Enter Your Email Id" class="assignment_form_ip rounded" onfocus="decorateIpField(this.id)" /><i id="emails_valid" class=""></i>
                </div>
                    <div class="col-3"> 
                  <input id="topics" name="topic" type="text" value="" placeholder="Enter Topic" class="assignment_form_ip rounded" onfocus="decorateIpField(this.id)" />
                  <i id="topics_valid" class=""></i>
                </div>
                <div class="col-3">
                  <div class="quantity">
                    <a href="#" class="quantitys__minus red_cologbg"><span>-</span></a>
                    <input id="quantitys" name="quantity" type="text" class="quantitys__input assignment_form_ip" value="1 Page / 250 Words" />
                    <a href="#" class="quantitys__plus red_cologbg"><span>+</span></a>                    
                  </div>
                </div>
                    <div class="col-2"> 
                  <input id="datepickers" name="datepickers" type="text" value="" placeholder="Deadline dd-mm-yyyy" class="assignment_form_ip" readonly="readonly" />
                  <i id="datepickers_valid" class=""></i>                 
                </div>
                <div class="col-1">
                  <input id="submits" name="submit" type="submit" value="Continue" class="input-button-class float-end rounded red_cologbg border-0 scroll_form_submit white_text rounded" />
                  <input type="hidden" id="clientDatee" name="clientDate" value="<?=date("Y-m-d H:i")?>" /> 
                  <input type="hidden" id="country_by_ip" name="country_by_ip" value="<?=$country_by_ip ?>" /> 
                  <input type="hidden" id="page_url" name="page_url" value="<?=$page_url_form ?>#scroll-form" />
                  <input type="hidden" name="tok" value="<?=$_SESSION['token']?>">
                  <input type="hidden" id="numOfProjects" name="numOfProject" value="1" />
                  <input type="hidden" id="numOfwords" name="numOfword" value="250" />
                  <input type="hidden" id="user_times" name="user_time" value="23:45" />
                  <input type="hidden" id="deadlines" name="deadline" type="text" value="" />
                  <input type="hidden" id="whichstep" name="whichstep" type="text" value="1" />
                </div>
              </div>                                    
            </form>
          </div>
          </div>
      </div>
    </div>
