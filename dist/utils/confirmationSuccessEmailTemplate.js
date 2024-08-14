"use strict";
// emailTemplate.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmationSuccessEmailTemplate = void 0;
const confirmationSuccessEmailTemplate = (name) => {
    const body = `
      
   
        <p>Thank you for registering with us! We are excited to have you as part of our community. Stay tuned for updates on Recapeo's latest blogs and services.</p>
   

  
       `;
    const message = `
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f5f5f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif; background-color: #f5f5f8">
        <tr>
            <td>
                <table style="background-color: #f5f5f8; max-width:680px;  margin:0 auto; font-family:'Rubik',sans-serif; padding: 30px" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:40px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center; padding: 0 40px;">
                          <a href="javascript:void(0)" title="logo" target="_blank">
                            <img width="108.73px" height="30px" src="cid:logo" alt="">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="600px" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:600px;background:#fff; border-radius:0px; text-align:left; padding: 20px">
                                <tr>
                                    <td style="height:30px;">&nbsp;</td>
                                </tr>
                                
                                <tr>
                                    <td style="height:7px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 30px;">
                                      
                                    <p style="color:#000; font-size:18px;line-height:24px; margin:10px 0 0 0; font-weight:bold; font-family:'Rubik',sans-serif; margin: 0 0 15px 0; letter-spacing: -0.01em; color: #121212;">
                                
                                    Email success registration
                                        
                                    </p>
                                    <p style="color:#000; font-size:16px;line-height:18px; margin:10px 0 0 0; font-weight:medium; font-family:'Rubik',sans-serif; margin: 0 0 15px 0; letter-spacing: -0.01em; color: #121212;">
                                
                                    <img width="20"  src="cid:hand" alt=""> Hey, ${name}
                                        
                                    </p>
                                   

                                      
                                        <p style=" font-size:15px;line-height:24px; margin:0 0 15px 0; line-height: 32px;">
                                        ${body}
                                          
                                          
                                        </p>

                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td style="height:10px;">&nbsp;</td>
                                </tr>
                                
                                

                                <tr>
                                    <td style="height:24px;">&nbsp;</td>
                                </tr>
                                
                                <tr>
                                    <td style="text-align:left; padding: 10px 30px; ">
                                    <hr style="width: 100%; height: 0.01rem; margin-bottom: 15px; background-color:#0000001a;"></hr>
                                      <p style="color:#999999; font-size:14px;line-height:24px; margin:0 0 15px 0;">Need help? Contact our support team.</p>
                                      <p style="color:#999999; font-size:14px;line-height:24px; margin:0;">Copyright © 2023 - Recapeo</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
               
                            </table>
                        </td>
                    
                </table>
            </td>
        </tr>
         <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
               
    </table>
</body>
`;
    return message;
};
exports.confirmationSuccessEmailTemplate = confirmationSuccessEmailTemplate;
//# sourceMappingURL=confirmationSuccessEmailTemplate.js.map