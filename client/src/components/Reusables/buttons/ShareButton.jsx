import React, { useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const ShareButton = ({ shareUrl, shareBtnSize, shareSocialIconsSize }) => {
  const [showShareIcons, setShowShareIcons] = useState(false);

  return (
    <div>
      <IoShareSocialSharp
        size={shareBtnSize}
        className="text-primary cursor-pointer"
        onMouseEnter={() => setShowShareIcons(true)}
        onMouseLeave={() => setShowShareIcons(false)}
      />
      {/* Social Media Icons */}
      {showShareIcons && (
        <div
          className="absolute bottom-1 left-5 flex gap-x-2 p-1 bg-white shadow-lg rounded"
          onMouseEnter={() => setShowShareIcons(true)}
          onMouseLeave={() => setShowShareIcons(false)}
        >
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={shareSocialIconsSize} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={shareSocialIconsSize} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={shareSocialIconsSize} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={shareSocialIconsSize} round />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
