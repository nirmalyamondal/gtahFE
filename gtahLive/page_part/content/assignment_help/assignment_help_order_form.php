<form id="helpForm" name="helpForm" action="https://www.gotoassignmenthelp.com/next-step.php" method="post" enctype="multipart/form-data" accept-charset="utf-8" class="form form_home">
                            
                            <div class="row">
                              <div class="col-5"> 
                                  <div class="step_1_label step_12_label active"><p class="text_left white_text">Step 1</p></div>                      
                              </div>
                              <div class="col-2">
                                  <img src="https://www.gotoassignmenthelp.com/images/lineArrow.webp" width="35px" height="15px" alt="Form step 1 to step 2" class="img-fluid step1_2_arrow" loading="lazy" />
                              </div>
                              <div class="col-5">
                                <div class="step_2_label step_12_label"><p class="text_left white_text">Step 2</p></div>
                              </div>
                            </div>
                    <div class="w-90"><span id="error_missing_filed"></span></div> 
                    <div class="row">
                          <div class="col-12"> 
                        <label for="EnterYourEmailId">Enter Your Email Id &nbsp; <i id="emailid_valid" class=""></i> </label>
                          <input id="emailid" name="email" type="text" value="" placeholder="e.g. your@email.id" class="assignment_form_ip rounded" onfocus="decorateIpField(this.id)" />                      
                      </div>
                    </div>
                    <div class="row">
                          <div class="col-lg-8"> 
                        <label for="EnterYourEmailId">Enter Topic &nbsp; <i id="topic_valid" class=""></i></label>
                          <input id="topic" name="topic" type="text" value="" placeholder="e.g Self & community" class="assignment_form_ip rounded" onfocus="decorateIpField(this.id)" />
                      </div>
                      <div class="col-lg-4">
                        <label for="EnterYourEmailId">No. of Pages / Words</label>
                          <div class="quantity">
                          <a href="#" class="quantity__minus red_cologbg"><span>&#8722;</span></a>
                          <input name="quantity" type="text" class="quantity__input assignment_form_ip" value="1 / 250" aria-label="quantity" />
                          <a href="#" class="quantity__plus red_cologbg"><span>+</span></a>                 
                        </div>
                      </div>
                    </div>
                    <div class="row">
                          <div class="col-8"> 
                        <label for="EnterYourEmailId">Choose Assignment Deadline &nbsp; <i id="datepicker_valid" class=""></i></label>
                          <input id="datepicker" name="datepicker" type="text" value="" placeholder="e.g. dd-mm-yyyy" class="assignment_form_ip" readonly="readonly" />
                      </div>
                      <div class="col-4">
                        <label for="EnterYourEmailId">Time</label>
                          <select class="assignment_form_ip timepickerdd float-start" id="deadlinetime" name="deadlinetime">
                          <option value="01:00">01:00 AM</option>
                          <option value="02:00">02:00 AM</option>
                          <option value="03:00">03:00 AM</option>
                          <option value="04:00">04:00 AM</option>
                          <option value="05:00">05:00 AM</option>
                          <option value="06:00">06:00 AM</option>
                          <option value="07:00">07:00 AM</option>
                          <option value="08:00">08:00 AM</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                          <option value="17:00">05:00 PM</option>
                          <option value="18:00">06:00 PM</option>
                          <option value="19:00">07:00 PM</option>
                          <option value="20:00">08:00 PM</option>
                          <option value="21:00">09:00 PM</option>
                          <option value="22:00">10:00 PM</option>
                          <option value="23:00" selected="selected">11:00 PM</option>
                          <option value="00:00">12:00 AM</option>
                        </select>                         
                      </div>
                    </div>
                    <div class="row">
                          <div class="col-12"> 
                        <label for="EnterYourEmailId">Enter Assignment Description </label>
                          <textarea id="description" name="description" type="text" value="" placeholder="Write assignment description " class="assignment_form_ip assignment_form_area rounded" onfocus="decorateIpField(this.id)" ></textarea>
                      </div>
                    </div>
                    <div class="row">
                          <div class="col-8"> 
                          <input id="upload" name="upload[]" type="file" value="" placeholder="" class="assignment_form_ip" aria-label="Upload" />
                      </div>
                      <div class="col-4">
                        <input id="submit" name="submit" type="submit" value="Continue" class="input-button-class float-end red_color_link red_cologbg white_text rounded" />
                        <input type="hidden" id="clientDatee" name="clientDate" value="<?=date("Y-m-d H:i")?>" /> 
                        <input type="hidden" id="country_by_ip" name="country_by_ip" value="<?=$country_by_ip ?>" /> 
                        <input type="hidden" id="page_url" name="page_url" value="<?=$page_url_form ?>" />
                        <input type="hidden" name="tok" value="<?=$_SESSION['token']?>" />
                        <input type="hidden" id="numOfProject" name="numOfProject" value="1" />
                        <input type="hidden" name="numOfword" id="numOfword" value="250" />
                        <input type="hidden" id="user_time" name="user_time" class="user_time" value="23:00" />
                        <input type="hidden" id="deadline" name="deadline" type="text" value="" />
                      </div>
                    </div>                                    
                  </form>
