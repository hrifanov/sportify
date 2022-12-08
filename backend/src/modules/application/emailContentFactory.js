import { FE_HOSTNAME } from "../../config/variables"
export const createHTMLContent = (recieverUsername, appliedUsername, clubName, confirmationToken) => {
  const confirmUrl = `${FE_HOSTNAME}confirmApplication/${confirmationToken}`;
  return `
  <div>Hi ${recieverUsername},</div><br>
  <br>
  <div>${appliedUsername} would like to join your club ${clubName}.</div><br>
  <br>
  <div>You can confirm his application right away by clicking on <a href="${confirmUrl}" target="_blank">this link</a>.</div><br>
  <div>May this new potential player bring even more power and prosperity to yours already strong and powerful team.</div><br>
  <br>
  <div>Best regards,</div><br>
  <div>The Sportify Team</div>
  <br>
  `
};