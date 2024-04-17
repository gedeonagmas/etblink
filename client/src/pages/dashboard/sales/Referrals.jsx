import React, { useState } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WeiboShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  //icons
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Referrals = () => {
  const user = JSON.parse(localStorage.getItem("etblink_user"));
  const [text, setText] = useState({
    value: `https://etblink.com/signup?id=${user?.user?._id}`,
    copied: false,
  });

  const links = [
    { icon: EmailIcon, button: EmailShareButton, title: "Email" },
    { icon: FacebookIcon, button: FacebookShareButton, title: "Facebook" },
    {
      icon: FacebookMessengerIcon,
      button: FacebookMessengerShareButton,
      title: "Messenger",
    },
    { icon: LinkedinIcon, button: LinkedinShareButton, title: "Linkedin" },
    { icon: PinterestIcon, button: PinterestShareButton, title: "Pinterest" },
    { icon: TelegramIcon, button: TelegramShareButton, title: "Telegram" },
    { icon: XIcon, button: TwitterShareButton, title: "X(Twitter)" },
    { icon: ViberIcon, button: ViberShareButton, title: "Viber" },
    { icon: WhatsappIcon, button: WhatsappShareButton, title: "Whatsapp" },
    { icon: GabIcon, button: GabShareButton, title: "Gab" },
    { icon: HatenaIcon, button: HatenaShareButton, title: "Hatena" },
    {
      icon: InstapaperIcon,
      button: InstapaperShareButton,
      title: "Insta paper",
    },
    { icon: LineIcon, button: LineShareButton, title: "Line" },
    { icon: LivejournalIcon, button: LivejournalShareButton, title: "Live" },
    { icon: MailruIcon, button: MailruShareButton, title: "Mailru" },
    { icon: OKIcon, button: OKShareButton, title: "Ok" },
    { icon: PocketIcon, button: PocketShareButton, title: "Pocket" },
    { icon: RedditIcon, button: RedditShareButton, title: "Reddit" },
    { icon: TumblrIcon, button: TumblrShareButton, title: "Tumblr" },
    { icon: VKIcon, button: VKShareButton, title: "VK" },
    { icon: WeiboIcon, button: WeiboShareButton, title: "Weibo" },
    { icon: WorkplaceIcon, button: WorkplaceShareButton, title: "Work" },
  ];

  return (
    <div className="w-full h-full px-10 gap-4 flex flex-col">
      <p className="text-xl font-bold">Share us with</p>
      <p className="text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
        consequuntur cumque placeat, molestias, saepe corrupti dolore distinctio
        quos perferendis rerum eaque? Hic, possimus animi. Commodi voluptatum
        facilis vel saepe vitae.
      </p>

      <p className="font-bold">Referral Link.</p>

      <div className="w-full flex gap-3 items-center justify-start">
        <input
          disabled
          value={text.value}
          className="w-full border p-2 border-gray-400 rounded-lg max-w-lg"
        />

        <CopyToClipboard
          text={text.value}
          onCopy={() => {
            setText({ copied: true });
            setTimeout(() => {
              setText({ copied: false });
            }, 4000);
          }}
        >
          <button className="ml-5 px-3 py-1 rounded-lg bg-main text-white hover:bg-red-500">
            Copy
          </button>
        </CopyToClipboard>

        {text.copied ? (
          <span className="bg-emerald-200 text-sm text-emerald-500 font-bold ml-5 p-1 rounded-lg border border-emerald-500">
            Copied.
          </span>
        ) : null}
      </div>

      <p className="font-bold mt-2">Direct share</p>
      <div className="grid w-full mt-2 bg-gray-100 rounded-lg px-5 py-8 grid-cols-3 gap-6 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
        {links.map((ref) => {
          return (
            <div
              key={ref.button}
              className="w-auto text-center hover:scale-110 h-auto flex flex-col gap-1 items-center  justify-center rounded-full"
            >
              <ref.button
                url={`https://etblink.com/signup?id=${user?.user?._id}`} //eg. https://www.example.com
                quotes={"Advert your Company Service and Products with us!!"} //"Your Quotes"
                hashtag={"#etblink"} // #hashTag
              >
                <div className="relative flex items-center justify-center">
                  <ref.icon className="w-10 h-10  hover:bg-gray-200/40 rounded-full" />
                </div>
                <p className="text-sm">{ref.title}</p>
              </ref.button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Referrals;
