import {
  AiFillCaretUp,
  AiFillPicture,
  AiFillPlusCircle,
  AiOutlineArrowRight,
  AiOutlineLeft,
  AiOutlineMail,
  AiOutlineRight
} from "react-icons/ai";
import {
  BiCalendarEvent,
  BiCurrentLocation,
  BiInfoCircle,
  BiMinusCircle,
  BiSearchAlt2,
  BiWater
} from "react-icons/bi";
import { BsLayersHalf, BsLink45Deg } from "react-icons/bs";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { FiClock, FiDownload, FiPhone, FiUser, FiUsers } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineLocationMarker
} from "react-icons/hi";
import { IoIosArrowDown, IoMdCalendar } from "react-icons/io";
import { IoCloseOutline, IoLocationSharp } from "react-icons/io5";
import {
  MdArrowBack,
  MdArrowBackIos,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdAttachFile,
  MdBusiness,
  MdDone,
  MdEmail,
  MdExitToApp,
  MdKeyboardArrowDown,
  MdList,
  MdMoreVert,
  MdOpenInNew,
  MdOutlineCampaign,
  MdOutlineDelete,
  MdOutlineDescription,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdOutlineGroups,
  MdOutlineInsertPhoto,
  MdOutlinePerson,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdSettings,
  MdSplitscreen,
  MdTune,
  MdUnfoldMore,
  MdViewModule
} from "react-icons/md";
import {
  RiArrowDownSFill,
  RiArrowDownSLine,
  RiMap2Fill,
  RiTempColdLine
} from "react-icons/ri";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
  TiThMenu
} from "react-icons/ti";
import { VscVerified } from "react-icons/vsc";
export interface IconProps {
  name: string;
  className?: string;
  color?: string;
  width?: string;
  height?: string;
}

const Icon = ({ name, className, color, width, height }: IconProps) => {
  switch (name) {
    case "temp":
      return <RiTempColdLine className={className} />;
    case "layer":
      return <BsLayersHalf className={className} />;
    case "location":
      return <HiOutlineLocationMarker className={className} />;
    case "date":
      return <BiCalendarEvent className={className} />;
    case "info":
      return <BiInfoCircle className={className} />;
    case "download":
      return <FiDownload className={className} />;
    case "water":
      return <BiWater className={className} />;
    case "verified":
      return <VscVerified className={className} />;
    case "plus":
      return <CgMathPlus className={className} />;
    case "minus":
      return <CgMathMinus className={className} />;
    case "search":
      return <BiSearchAlt2 className={className} />;
    case "Searchlocation":
      return <GoLocation className={className} />;
    case "MapLocation":
      return <IoLocationSharp className={className} />;
    case "filter":
      return <MdTune className={className} />;
    case "delete":
      return <BiMinusCircle className={className} />;
    case "calendar":
      return <IoMdCalendar className={className} />;
    case "arrowDown":
      return <RiArrowDownSLine className={className} />;
    case "miniArrowDown":
      return <RiArrowDownSFill className={className} />;
    case "arrowUp":
      return <AiFillCaretUp className={className} />;
    case "close":
      return <IoCloseOutline className={className} />;
    case "map":
      return <RiMap2Fill className={className} />;
    case "current":
      return <BiCurrentLocation className={className} />;
    case "back":
      return <MdArrowBackIosNew className={className} />;
    case "backMobile":
      return <MdArrowBack className={className} />;
    case "phone":
      return <FiPhone className={className} />;
    case "email":
      return <MdEmail className={className} />;
    case "user":
      return <FiUser className={className} />;
    case "users":
      return <FiUsers className={className} />;
    case "modules":
      return <MdViewModule className={className} />;
    case "time":
      return <FiClock className={className} />;
    case "exit":
      return <MdExitToApp className={className} />;
    case "company":
      return <MdBusiness className={className} />;
    case "userEmail":
      return <AiOutlineMail className={className} />;
    case "dropdownArrow":
      return <MdKeyboardArrowDown className={className} />;
    case "connect":
      return <BsLink45Deg className={className} />;
    case "add":
      return <AiFillPlusCircle className={className} />;
    case "more":
      return <MdMoreVert className={className} />;
    case "menu":
      return <TiThMenu className={className} />;
    case "down":
      return <IoIosArrowDown className={className} />;
    case "attachment":
      return <MdAttachFile className={className} />;
    case "active":
      return <MdDone className={className} />;
    case "list":
      return <MdList className={className} />;
    case "showMore":
      return <MdUnfoldMore className={className} />;
    case "unsorted":
      return <TiArrowUnsorted className={className} />;
    case "sortedUp":
      return <TiArrowSortedUp className={className} />;
    case "sortedDown":
      return <TiArrowSortedDown className={className} />;
    case "burger":
      return <GiHamburgerMenu className={className} />;
    case "forward":
      return <MdArrowForwardIos className={className} />;
    case "backward":
      return <MdArrowBackIos className={className} />;
    case "visibleOn":
      return <MdOutlineVisibility className={className} />;
    case "visibleOff":
      return <MdOutlineVisibilityOff className={className} />;
    case "returnArrow":
      return <HiOutlineArrowNarrowLeft className={className} />;
    case "splitView":
      return <MdSplitscreen className={className} />;
    case "picture":
      return <AiFillPicture className={className} />;
    case "remove":
      return <FaTrash className={className} />;
    case "arrowRight":
      return <AiOutlineArrowRight className={className} />;
    case "photo":
      return <MdOutlineInsertPhoto className={className} />;
    case "description":
      return <MdOutlineDescription className={className} />;
    case "campaign":
      return <MdOutlineCampaign className={className} />;
    case "group":
      return <MdOutlineGroups className={className} />;
    case "person":
      return <MdOutlinePerson className={className} />;
    case "leftArrow":
      return <AiOutlineLeft className={className} />;
    case "rightArrow":
      return <AiOutlineRight className={className} />;
    case "deleteItem":
      return <MdOutlineDelete className={className} />;
    case "settings":
      return <MdSettings className={className} />;
    case "fullscreen":
      return <MdOutlineFullscreen className={className} />;
    case "exitFullScreen":
      return <MdOutlineFullscreenExit className={className} />;
    case "open":
      return <MdOpenInNew className={className} />;
    case "approved":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="16px"
          width="16px"
          fill="#FFFF"
        >
          <circle cx="12" cy="12" r="12" fill={color} />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
      );
    case "rejected":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          width="16px"
          viewBox="0 0 24 24"
          fill="#FFFF"
        >
          <circle cx="12" cy="12" r="12" fill={color} />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      );

    case "returned":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          width="16px"
          viewBox="0 0 24 24"
          fill="#FFFF"
        >
          <circle cx="12" cy="12" r="12" fill={color} />
          <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
        </svg>
      );

    case "evv":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <g
            id="Group_6068"
            data-name="Group 6068"
            transform="translate(-349.5 -473.5)"
          >
            <path
              id="Path_2975"
              data-name="Path 2975"
              d="M365.876,473.5H351.124a1.624,1.624,0,0,0-1.624,1.624v14.752a1.624,1.624,0,0,0,1.624,1.624h.715v-8.064a6.661,6.661,0,0,1,6.661-6.661h0a6.661,6.661,0,0,1,6.661,6.661V491.5h.715a1.624,1.624,0,0,0,1.624-1.624V475.124A1.624,1.624,0,0,0,365.876,473.5Z"
              transform="translate(0 0)"
              fill="#fff"
            />
            <path
              id="Path_2976"
              data-name="Path 2976"
              d="M386.98,529.746c-.8.366.412-1.146-.262-.907-.011-.077.122-.252.2-.136.115.016,0-.147-.087-.1-.737-.276-1.219-1-1.838-1.46.04-.25-.94-.053-1.251-.254-.077-.1-.422-1.092-.426-.7-.5-.1-.641.812-1.07.366-.5.27-.477.071-.924-.1-.12-.082-.448.138-.32-.041.022-.1-.153.013-.285-.039-.224.287-.548-.19-.861-.015-.3.605-.289-.29-.532-.177-.542.475-1.26-.357-1.959.11-2.692.459-1.638,2.136-1.535,3.648-.057.243.174-.084.253-.018.053.259.94.714,1.213.711.193-.116.069.427.324.12a1.353,1.353,0,0,1,.693.016c.527-.279.107.314.6.365.4.31.189.567-.109.874-.011.649-.245,1.018.474,1.014.183-.041.065.094.2.106s-.106.207.236.169c1.148.256.4,1.668,1.382,1.243.051.08.2.028.292-.049.51.233.451-.322.791.178.517.062.426-.3.868-.357.148.277.467.031.213-.358.194-.033.043-.038.1-.129.318-.065.172-.092.4.062.445-.064.3-.442.444-.473.351.183.374-.2.584-.111-.043.093.332.262.032.212-.176.422.8.5.526-.223-.21.1,0-.076-.149-.119-.516.244-.276-.151-.173-.373-.051-.364.149-.263.269-.47,0-.2-.211-.615,0-.752.222-.975.831-.051,1-1.125.044-.241.417.141.414-.078.2-.079.39.343.374-.153C387.255,529.909,387.735,529.873,386.98,529.746Z"
              transform="translate(-22.714 -44.877)"
              fill="#fff"
            />
          </g>
        </svg>
      );

    case "logo":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 249.395 40"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="0.213"
              y1="0.91"
              x2="0.787"
              y2="0.09"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stop-color="#8fcea5" />
              <stop offset="0.26" stop-color="#8ccda8" />
              <stop offset="0.47" stop-color="#82cdb2" />
              <stop offset="0.67" stop-color="#72cbc3" />
              <stop offset="0.85" stop-color="#5cc9da" />
              <stop offset="1" stop-color="#44c8f5" />
            </linearGradient>
          </defs>
          <g
            id="Group_7785"
            data-name="Group 7785"
            transform="translate(19252 4725)"
          >
            <path
              id="Path_3483"
              data-name="Path 3483"
              d="M9.115,3.9Q5.23,3.9,3.362,2.025T1.494-3.753V-16.1H6.238V-3.753A3.972,3.972,0,0,0,6.954-1.1a2.732,2.732,0,0,0,2.161.81,2.732,2.732,0,0,0,2.161-.81,3.972,3.972,0,0,0,.716-2.652V-16.1h4.744V-3.753q0,3.913-1.868,5.781T9.115,3.9Zm11.411-.45V-16.1H34l.218,3.94h-8.93v3.776h7.839V-4.43H25.284V-.49h9.271L33.9,3.446ZM51.132-16.1v4.172H45.965V3.446H41.221V-11.933H36.054V-16.1ZM64.752,3.45,59.967-4.516H58.358V3.446H53.6V-16.1h4.758v7.8h1.609l4.472-7.8H69.66L63.852-6.657l6.285,10.1Z"
              transform="translate(-19203.408 -4708.9)"
              fill="#231f20"
            />
            <path
              id="Path_3484"
              data-name="Path 3484"
              d="M4.388,1.323a3.327,3.327,0,0,1-2.5-.85,3.732,3.732,0,0,1-.817-2.664V-8.382h1.05v6.191A2.774,2.774,0,0,0,2.687-.225a2.261,2.261,0,0,0,1.7.591,2.261,2.261,0,0,0,1.7-.591,2.774,2.774,0,0,0,.571-1.966V-8.382H7.722v6.191A3.718,3.718,0,0,1,6.9.463a3.327,3.327,0,0,1-2.512.86ZM13.1-5.851a2.421,2.421,0,0,1,2.056.857,4.465,4.465,0,0,1,.654,2.7,4.465,4.465,0,0,1-.654,2.7,2.421,2.421,0,0,1-2.056.857A2.59,2.59,0,0,1,11.668.9a1.84,1.84,0,0,1-.744-.837v3.6l-.99.146V-5.725h.83l.159,1.076a1.858,1.858,0,0,1,.744-.84A2.572,2.572,0,0,1,13.1-5.851ZM11.382-.238A1.7,1.7,0,0,0,12.86.393a1.712,1.712,0,0,0,1.481-.631A3.539,3.539,0,0,0,14.8-2.291a3.522,3.522,0,0,0-.462-2.049,1.716,1.716,0,0,0-1.481-.628,1.707,1.707,0,0,0-1.478.628,3.543,3.543,0,0,0-.458,2.049,3.56,3.56,0,0,0,.461,2.053ZM17.62-6.814V-8.176h.99v1.362Zm0,7.958V-5.725h.99V1.143Zm8.4,2.039a1.024,1.024,0,0,0,.289-.04,1.291,1.291,0,0,0,.189-.066l.066-.04v.651a1.484,1.484,0,0,1-.751.166,1.181,1.181,0,0,1-.857-.279,1.045,1.045,0,0,1-.286-.784,1.6,1.6,0,0,1,.29-.891,2.5,2.5,0,0,1,.83-.761h-.12L25.517.107a2.191,2.191,0,0,1-2.172,1.156A2.466,2.466,0,0,1,21.4.529a3.123,3.123,0,0,1-.651-2.136V-5.725h.99v3.932A2.533,2.533,0,0,0,22.18-.149,1.758,1.758,0,0,0,23.6.379a1.825,1.825,0,0,0,1.461-.528,2.492,2.492,0,0,0,.452-1.644V-5.725h1V1.143q-1.089.678-1.089,1.468,0,.572.6.572Zm1.953-.246.7-3.315h1.2l-1.3,3.315ZM38.019,1.263a3.342,3.342,0,0,1-2.6-.89,3.94,3.94,0,0,1-.8-2.7,3.941,3.941,0,0,1,.771-2.62,2.758,2.758,0,0,1,2.225-.907q2.923,0,2.923,3.54v.339H35.627A2.537,2.537,0,0,0,36.2-.192a2.49,2.49,0,0,0,1.86.585A5.528,5.528,0,0,0,40.1.054l-.153.923a5.722,5.722,0,0,1-1.928.286ZM35.627-2.7h3.946q-.053-2.312-1.946-2.312a1.842,1.842,0,0,0-1.455.585A2.628,2.628,0,0,0,35.627-2.7Zm10.01-5.859.7.159L44.663-6.56h-1L41.991-8.4l.7-.159,1.468,1.348ZM42.808.273h4l-.159.87H41.586V.366l3.906-5.208h-3.8v-.883H46.7v.771Zm8.469.99a3.342,3.342,0,0,1-2.6-.89,3.94,3.94,0,0,1-.8-2.7,3.941,3.941,0,0,1,.771-2.62,2.758,2.758,0,0,1,2.225-.907q2.923,0,2.923,3.54v.339h-4.91A2.537,2.537,0,0,0,49.457-.2a2.49,2.49,0,0,0,1.86.585A5.528,5.528,0,0,0,53.363.054L53.21.977a5.722,5.722,0,0,1-1.933.286ZM48.886-2.7h3.946q-.053-2.312-1.946-2.312a1.842,1.842,0,0,0-1.455.585A2.628,2.628,0,0,0,48.886-2.7Zm6.583,3.839V-5.725h.83l.159,1.016A2.125,2.125,0,0,1,58.53-5.852a2.3,2.3,0,0,1,1.016.179l.073.963A2.4,2.4,0,0,0,58.4-4.968q-1.946,0-1.946,2.126V1.143ZM66.09,3.183a1.024,1.024,0,0,0,.289-.04,1.291,1.291,0,0,0,.189-.066l.066-.04v.651a1.484,1.484,0,0,1-.751.166,1.181,1.181,0,0,1-.857-.279,1.045,1.045,0,0,1-.286-.784,1.6,1.6,0,0,1,.286-.887,2.5,2.5,0,0,1,.83-.761h-.12L65.585.107a2.191,2.191,0,0,1-2.172,1.156A2.466,2.466,0,0,1,61.467.529a3.123,3.123,0,0,1-.651-2.136V-5.725h.99v3.932a2.533,2.533,0,0,0,.442,1.644,1.758,1.758,0,0,0,1.425.528,1.825,1.825,0,0,0,1.461-.528,2.492,2.492,0,0,0,.452-1.644V-5.725h1V1.143Q65.5,1.821,65.5,2.611,65.492,3.183,66.09,3.183Zm5.965-10V-8.176h.99v1.362Zm0,7.958V-5.725h.99V1.143Zm3.222,0V-5.725h.83l.159,1.016a2.125,2.125,0,0,1,2.072-1.143,2.3,2.3,0,0,1,1.016.179l.073.963a2.4,2.4,0,0,0-1.216-.259q-1.946,0-1.946,2.126V1.143ZM86.223.379A2.957,2.957,0,0,0,87.5.12l-.166.89a2.4,2.4,0,0,1-1.275.252A2.154,2.154,0,0,1,84.41.645a2.69,2.69,0,0,1-.578-1.893V-4.881H82.663v-.844h1.169V-7.087l1-.232v1.594H87.4v.844H84.828v3.633A1.827,1.827,0,0,0,85.174.008a1.365,1.365,0,0,0,1.049.371Zm7.1-6.1h1.03l-2.7,6.868h-1.01l-2.7-6.868h1.076L91.165-.1Zm5.221,6.988a3.342,3.342,0,0,1-2.6-.89,3.94,3.94,0,0,1-.8-2.7,3.941,3.941,0,0,1,.771-2.62A2.758,2.758,0,0,1,98.14-5.85q2.923,0,2.923,3.54v.339H96.154a2.537,2.537,0,0,0,.571,1.78,2.49,2.49,0,0,0,1.86.585,5.528,5.528,0,0,0,2.046-.339l-.153.923a5.722,5.722,0,0,1-1.933.285ZM96.154-2.7H100.1q-.053-2.312-1.946-2.312a1.842,1.842,0,0,0-1.455.585A2.628,2.628,0,0,0,96.154-2.7Zm6.583,3.839V-5.725h.83l.159,1.03a2.169,2.169,0,0,1,2.165-1.156,2.449,2.449,0,0,1,1.946.744,3.162,3.162,0,0,1,.651,2.146v4.1h-.99V-2.789a2.547,2.547,0,0,0-.442-1.647,1.752,1.752,0,0,0-1.425-.531,1.812,1.812,0,0,0-1.451.531,2.493,2.493,0,0,0-.455,1.647V1.143Zm12.534,0L112.827-1.95H111.6V1.143h-.99V-8.335l.99-.166v5.7h1.216l2.3-2.923h1.156L113.63-2.41l2.843,3.554Zm2.451-7.958V-8.176h.99v1.362Zm0,7.958V-5.725h.99V1.143Zm3.222,0V-5.725h.83l.159,1.03A2.169,2.169,0,0,1,124.1-5.851a2.449,2.449,0,0,1,1.946.744,3.162,3.162,0,0,1,.651,2.146v4.1h-.99V-2.789a2.547,2.547,0,0,0-.442-1.647,1.752,1.752,0,0,0-1.425-.531,1.812,1.812,0,0,0-1.451.531,2.493,2.493,0,0,0-.455,1.647V1.143Zm7.9-7.958V-8.176h.99v1.362Zm0,7.958V-5.725h.99V1.143Zm8.4,2.039a1.024,1.024,0,0,0,.289-.04,1.29,1.29,0,0,0,.189-.066l.066-.04v.651a1.484,1.484,0,0,1-.751.166,1.181,1.181,0,0,1-.857-.279,1.045,1.045,0,0,1-.286-.784,1.6,1.6,0,0,1,.286-.887,2.5,2.5,0,0,1,.83-.761h-.12L136.74.107a2.191,2.191,0,0,1-2.172,1.156,2.466,2.466,0,0,1-1.946-.734,3.123,3.123,0,0,1-.651-2.136V-5.725h.99v3.932A2.533,2.533,0,0,0,133.4-.149a1.758,1.758,0,0,0,1.425.528,1.825,1.825,0,0,0,1.461-.528,2.492,2.492,0,0,0,.452-1.644V-5.725h1V1.143q-1.089.678-1.089,1.468,0,.572.6.572Zm10.6-2.039L145.4-1.945h-1.229V1.143h-.99V-8.335l.99-.166v5.7h1.216l2.3-2.923h1.156L146.205-2.41l2.843,3.554Zm4.045.12A2.391,2.391,0,0,1,150.177.7a2.02,2.02,0,0,1-.585-1.534,1.8,1.8,0,0,1,.618-1.448,2.734,2.734,0,0,1,1.813-.525h2.165V-3.2a1.762,1.762,0,0,0-.435-1.325,2.149,2.149,0,0,0-1.5-.415,7.627,7.627,0,0,0-2.106.272l.159-.9a8.452,8.452,0,0,1,2.139-.246,2.853,2.853,0,0,1,2.076.654,2.649,2.649,0,0,1,.661,1.963V1.143h-.83l-.166-1.1a2.233,2.233,0,0,1-2.295,1.22Zm.193-.8a2.275,2.275,0,0,0,1.558-.485,1.868,1.868,0,0,0,.548-1.475v-.571h-2.013q-1.581,0-1.581,1.236.006,1.3,1.49,1.3Zm9.671-8.8.99-.166v9.65h-.83L161.755.067a1.84,1.84,0,0,1-.744.837,2.59,2.59,0,0,1-1.435.359,2.425,2.425,0,0,1-2.049-.857,4.431,4.431,0,0,1-.661-2.7,4.431,4.431,0,0,1,.661-2.7,2.425,2.425,0,0,1,2.049-.857,2.572,2.572,0,0,1,1.435.362,1.841,1.841,0,0,1,.744.854Zm-3.418,8.1a1.712,1.712,0,0,0,1.481.631A1.7,1.7,0,0,0,161.3-.238a3.56,3.56,0,0,0,.458-2.053A3.543,3.543,0,0,0,161.3-4.34a1.707,1.707,0,0,0-1.478-.628,1.716,1.716,0,0,0-1.481.628,3.522,3.522,0,0,0-.462,2.049,3.539,3.539,0,0,0,.459,2.053Zm8.326,1.5A2.391,2.391,0,0,1,164.95.7a2.02,2.02,0,0,1-.585-1.534,1.8,1.8,0,0,1,.618-1.448A2.734,2.734,0,0,1,166.8-2.8h2.165v-.392a1.762,1.762,0,0,0-.435-1.325,2.149,2.149,0,0,0-1.5-.415,7.627,7.627,0,0,0-2.106.272l.159-.9a8.452,8.452,0,0,1,2.139-.246,2.854,2.854,0,0,1,2.076.654,2.649,2.649,0,0,1,.661,1.963V1.143h-.83l-.166-1.1a2.233,2.233,0,0,1-2.3,1.22Zm.193-.8a2.275,2.275,0,0,0,1.558-.485A1.868,1.868,0,0,0,168.96-1.5v-.571h-2.01q-1.581,0-1.581,1.236.007,1.3,1.488,1.3Zm9.276.312a3.252,3.252,0,0,1-2.03.529,5.99,5.99,0,0,1-2.3-.385l-.166-.937A4.63,4.63,0,0,0,172.666.3a6.477,6.477,0,0,0,1.372.143q1.767,0,1.767-1.1a.938.938,0,0,0-.266-.724,1.978,1.978,0,0,0-.943-.379l-1.182-.246a2.544,2.544,0,0,1-1.388-.648A1.752,1.752,0,0,1,171.6-3.9a1.71,1.71,0,0,1,.661-1.435,3.262,3.262,0,0,1,2.009-.511,5.607,5.607,0,0,1,2.092.345l.053.91a4.8,4.8,0,0,0-2.039-.385q-1.807,0-1.807,1.05a.881.881,0,0,0,.272.694,1.994,1.994,0,0,0,.937.369l1.143.232a2.757,2.757,0,0,1,1.445.668,1.8,1.8,0,0,1,.422,1.279,1.764,1.764,0,0,1-.655,1.462Zm4.972-.4A2.957,2.957,0,0,0,182.387.12l-.166.89a2.4,2.4,0,0,1-1.275.252,2.155,2.155,0,0,1-1.654-.618,2.69,2.69,0,0,1-.578-1.893V-4.881h-1.169v-.844h1.169V-7.087l1-.232v1.594h2.571v.844H179.71v3.633a1.827,1.827,0,0,0,.345,1.255A1.365,1.365,0,0,0,181.1.379Zm2.6.764v-6.86h.83l.159,1.016a2.125,2.125,0,0,1,2.072-1.143,2.3,2.3,0,0,1,1.016.179l.073.963a2.4,2.4,0,0,0-1.216-.259q-1.946,0-1.946,2.126V1.143Zm6.975.12A2.391,2.391,0,0,1,188.963.7a2.02,2.02,0,0,1-.585-1.534A1.8,1.8,0,0,1,189-2.278a2.734,2.734,0,0,1,1.81-.522h2.165v-.392a1.762,1.762,0,0,0-.435-1.325,2.149,2.149,0,0,0-1.5-.415,7.627,7.627,0,0,0-2.106.272l.159-.9a8.452,8.452,0,0,1,2.139-.246,2.853,2.853,0,0,1,2.076.654,2.649,2.649,0,0,1,.661,1.963V1.143h-.83l-.166-1.1a2.233,2.233,0,0,1-2.3,1.22Zm.193-.8a2.275,2.275,0,0,0,1.558-.485,1.868,1.868,0,0,0,.548-1.475v-.571h-2.013q-1.581,0-1.581,1.236.006,1.306,1.487,1.306Zm9.276.312a3.252,3.252,0,0,1-2.029.518,5.99,5.99,0,0,1-2.3-.385l-.166-.937A4.63,4.63,0,0,0,196.678.3a6.478,6.478,0,0,0,1.372.143q1.767,0,1.767-1.1a.938.938,0,0,0-.266-.724,1.979,1.979,0,0,0-.943-.379l-1.182-.246a2.544,2.544,0,0,1-1.388-.648,1.752,1.752,0,0,1-.425-1.245,1.71,1.71,0,0,1,.661-1.435,3.262,3.262,0,0,1,2.009-.511,5.607,5.607,0,0,1,2.092.345l.053.91a4.8,4.8,0,0,0-2.039-.385q-1.807,0-1.807,1.05a.881.881,0,0,0,.272.694,1.994,1.994,0,0,0,.937.369l1.143.232a2.757,2.757,0,0,1,1.445.668A1.8,1.8,0,0,1,200.8-.69a1.764,1.764,0,0,1-.654,1.468Z"
              transform="translate(-19203.408 -4688.912)"
              fill="#231f20"
            />
            <path
              id="AAA-Logo-RGB-LT_4_"
              data-name="AAA-Logo-RGB-LT (4)"
              d="M36.539,31.284c.112-.166.224-.333.331-.5-.163.254-.331.5-.5.745.061-.082.116-.16.173-.242Zm-8.4-29.558c.227.1.454.205.676.316.146.069.288.139.43.212-.433-.224-.876-.437-1.333-.63l.227.1ZM21.859.091c-.324-.033-.645-.054-.966-.069C21.214.037,21.535.061,21.859.091ZM.42,16.038c.024-.131.054-.26.082-.39-.01.03-.015.061-.022.091-.022.1-.042.2-.061.3Zm-.079.412c.024-.136.052-.276.079-.412-.039.185-.076.373-.109.56.01-.049.022-.1.03-.148ZM.2,17.371c.024-.19.054-.382.084-.57.005-.034.01-.067.015-.1-.064.382-.118.76-.158,1.138.018-.158.037-.316.057-.469ZM32.634,34.986c-.339-.064-.684-.128-1.03-.188-1-.178-2.024-.348-3.066-.5-.543-.082-1.087-.16-1.636-.23-.2-.03-.4-.057-.6-.084-.521-.069-1.047-.131-1.572-.195-2.029-.237-4.1-.424-6.2-.554-.563-.034-1.133-.064-1.7-.091-.091-.005-.185-.01-.272-.012-.146-.005-.294-.015-.439-.018-.39-.015-.785-.027-1.178-.037-.146-.01-.291-.015-.442-.015-2.617-.067-5.256-.024-7.854.133-.079,0-.151.012-.23.012-.449.027-.884.061-1.323.094l0,0c.106.118.212.237.321.351.215.233.439.46.666.679.161.158.321.309.488.46l.205.188c.143.128.288.254.437.373.084.076.17.146.257.212.245.2.5.4.758.582.151.112.306.222.46.331.378.264.766.511,1.166.748.106.064.218.128.331.19a.128.128,0,0,0,.024.015s.005,0,.012.005.01,0,.012,0c.057.034.116.067.173.1.233.133.469.254.711.375.121.061.245.118.37.175.005.005.015.005.022.012a19.971,19.971,0,0,0,5.116,1.608c.382.067.763.121,1.143.166l.039,0c.188.022.378.039.566.054s.385.03.578.039c.049,0,.094.01.143.01a.167.167,0,0,0,.037,0l.106.005c.072,0,.146.005.218.005l.094,0c.155,0,.309.005.467.005h.045c.173,0,.345,0,.518-.01.033,0,.067,0,.1,0,.1,0,.2-.005.3-.012.037,0,.076,0,.112-.005.624-.03,1.242-.094,1.854-.182.3-.045.605-.1.909-.155.358-.069.711-.148,1.066-.239l.1-.027c.227-.057.454-.121.679-.188.2-.057.409-.121.609-.19a.7.7,0,0,0,.106-.037c.128-.039.254-.084.378-.131s.237-.084.351-.131c.355-.133.706-.279,1.051-.433.195-.088.388-.178.582-.272.175-.084.351-.173.524-.267.022-.01.042-.022.064-.03.37-.2.73-.405,1.087-.624A19.43,19.43,0,0,0,32.9,35.3c.088-.072.166-.143.252-.218-.17-.033-.339-.067-.511-.1Zm-2.968-23.4c-1.148-.4-2.435.664-3.641,3.007-1.114,2.153-2.284,4.479-3.508,6.938a.319.319,0,0,1-.024.054c-.205.412-.412.839-.62,1.264-.112-.024-.227-.045-.343-.064-.684-.131-1.375-.254-2.057-.363-.106-.022-.212-.037-.318-.054-.418-.064-.83-.131-1.242-.188-.106-.018-.215-.034-.321-.045-1.857-.267-3.693-.464-5.494-.593-.488-.039-.975-.067-1.454-.091-.082-.005-.166-.005-.242-.01-.5-.027-.987-.042-1.474-.057a61.26,61.26,0,0,0-7.636.233c-.405.042-.805.084-1.2.136A.317.317,0,0,0,.1,21.8c.012.143.024.284.042.424.015.158.037.316.057.472.084.624.2,1.245.339,1.854.037.151.072.306.112.457s.082.3.124.452c.03.1.061.209.094.311.049.163.1.324.155.484a.45.45,0,0,0,.024.072c.4-.052.815-.1,1.224-.143,1.466-.158,2.96-.254,4.464-.3.5-.015,1.005-.024,1.508-.027l.249,0,.005,0c.5,0,1,0,1.493.012,2.148.024,4.31.139,6.473.333l.373.037c.405.037.809.079,1.212.124.124.012.249.022.37.039.539.054,1.072.124,1.612.188s1.094.146,1.642.224q.914-1.867,1.8-3.641c.218-.442.437-.879.649-1.314,1.151-2.308,2.254-4.5,3.3-6.545.832-1.612,1.491-2.114,1.714-2.208.139.23.326,1.1-.067,3.017q-.649,3.171-1.464,6.557c0,.027-.012.049-.015.076-.1.427-.212.864-.318,1.3a.543.543,0,0,0-.015.064c-.284,1.141-.57,2.3-.876,3.464.518.1,1.036.195,1.545.3.3-1.153.588-2.3.866-3.425q.167-.69.333-1.378c.545-2.281,1.042-4.5,1.479-6.639.715-3.483-.116-4.558-.936-4.849Zm10.352,8.453c0,.148,0,.3-.005.442-.005.284-.018.573-.039.857q-.027.39-.067.782c-.015.155-.033.309-.057.464-.005.069-.018.139-.027.209-.027.205-.061.415-.1.62-.005.03-.01.057-.018.088-.027.173-.061.345-.1.518-.039.2-.084.4-.131.6s-.1.393-.148.588c-.155.578-.336,1.145-.536,1.7-.022.054-.039.106-.061.158-.052.143-.106.282-.163.422-.072.182-.148.363-.227.545l-.233.511c-.057.121-.116.242-.173.36l-.182.355c-.124.242-.254.479-.388.711-.079.139-.16.279-.245.415s-.17.276-.254.409c-.163.254-.331.5-.5.745-.027.042-.057.084-.091.128-.076.106-.151.212-.23.316-.054.076-.112.151-.173.224-.037.049-.076.1-.116.148-.091.118-.185.233-.279.348s-.188.227-.284.339-.195.224-.294.333-.2.224-.306.336c-.061.064-.118.128-.182.19h0c-.212-.045-.424-.091-.637-.131-.257-.052-.518-.1-.778-.146l0-.005-.022,0a.056.056,0,0,0,.03-.024c.257-1,.509-1.98.748-2.95V30.63q.173-.677.333-1.353l0-.015c.233-.975.464-1.936.681-2.881,0-.03.015-.067.018-.1.1-.43.19-.857.284-1.281.005-.039.015-.079.024-.118.116-.545.23-1.081.339-1.617a5.415,5.415,0,0,0,.121-2.281,4.886,4.886,0,0,0-1.232,1.7q-.418.818-.851,1.669c-.218.424-.433.857-.652,1.287Q32.1,27.082,31.339,28.6c-.212.43-.424.86-.639,1.306q-.749,1.5-1.508,3.059c-.545-.082-1.087-.163-1.635-.233-.288-.045-.588-.084-.881-.124-.521-.069-1.047-.131-1.572-.195q-2.907-.345-5.913-.545c-.563-.039-1.126-.072-1.693-.1l-.005,0c-.185-.01-.366-.018-.551-.024-.146-.01-.284-.012-.427-.022-.4-.015-.793-.037-1.185-.042-.146-.01-.288-.012-.43-.012-2.6-.076-5.2-.052-7.787.088-.521.027-1.032.057-1.548.094-.042,0-.079.01-.121.01s-.088,0-.131.01c-.437.033-.869.072-1.306.112-.076-.1-.151-.2-.224-.3-.128-.175-.252-.358-.375-.539s-.242-.363-.358-.551c-.018-.03-.037-.061-.054-.088s-.033-.057-.049-.088c-.109-.175-.218-.355-.321-.533-.121-.212-.239-.424-.348-.639a.45.45,0,0,1-.03-.064c-.109-.209-.215-.422-.316-.637-.015-.034-.03-.067-.045-.1q-.086-.182-.163-.363c-.057-.131-.116-.26-.17-.393q.622-.078,1.251-.136,1.6-.159,3.226-.23c.506-.022,1.012-.039,1.523-.049.082-.005.17-.01.254-.01.5-.005,1-.01,1.5-.005,2.235.005,4.5.116,6.764.316l.385.037c.4.037.8.076,1.2.118l.382.039c.442.045.884.1,1.33.155l.005,0c.545.069,1.094.139,1.635.218q2.536.349,5.012.812h0c.518.094,1.03.19,1.538.3s1.039.205,1.548.316a.069.069,0,0,0,.012-.022c.209-.433.424-.86.632-1.287.509-1.03,1.012-2.032,1.5-3.01.015-.024.027-.049.039-.072.2-.405.405-.8.6-1.193.018-.033.033-.064.052-.1.328-.652.654-1.291.975-1.911,1.4-2.7,2.592-2.76,3.183-2.556.733.257,1.472,1.19.864,4.177-.118.6-.245,1.205-.385,1.82-.1.464-.2.93-.306,1.4-.215.936-.439,1.881-.669,2.844q-.155.641-.318,1.3c.057-.076.112-.158.166-.237a17.939,17.939,0,0,0,1.3-2.165c.2-.39.388-.788.56-1.2A18.8,18.8,0,0,0,28.852,3.424q-.637-.341-1.306-.637a18.564,18.564,0,0,0-1.8-.676Q25,1.87,24.22,1.693c-.331-.079-.666-.146-1.005-.2a18.807,18.807,0,0,0-21.168,13c-.131.427-.245.854-.345,1.291-.079.336-.146.679-.205,1.024a18.764,18.764,0,0,0-.233,1.938,64.481,64.481,0,0,1,8.444-.215c.488.018.975.039,1.472.069l0,0c.082,0,.158.005.239.005l.36.027c2.029-4.135,3.965-8.02,5.758-11.51.082-.163.166-.333.254-.5.146-.282.288-.545.437-.79,1.185-2.012,2.42-2.9,3.508-2.514.93.326,1.363,1.457,1.272,3.241a12.622,12.622,0,0,1-.146,1.326c-.037.233-.082.482-.133.733-.715,3.492-1.575,7.182-2.541,11-.112.46-.23.918-.348,1.378l-.316-.054c-.091-.018-.182-.03-.269-.045-.326-.054-.652-.1-.978-.146.118-.439.224-.876.336-1.318a.447.447,0,0,0,.015-.061c.975-3.849,1.835-7.563,2.56-11.07.057-.284.106-.543.136-.79a9.1,9.1,0,0,0,.121-1.311,2.467,2.467,0,0,0-.23-1.39c-.148.027-.593.282-1.217,1.163a10.525,10.525,0,0,0-.739,1.236,1.3,1.3,0,0,0-.069.131c-1.78,3.449-3.7,7.305-5.728,11.421h0q-.326.673-.666,1.36h0c-.2-.018-.4-.037-.593-.052s-.37-.024-.551-.037l-.267-.018c-.094,0-.188-.012-.279-.015V20c-.124,0-.239-.005-.363-.015-.076-.005-.161-.01-.239-.01-.494-.024-.985-.045-1.472-.057a60.8,60.8,0,0,0-7.809.254c-.4.039-.8.084-1.2.136,0-.084,0-.173,0-.26s0-.185,0-.276c0-.118,0-.233.005-.351,0-.185.012-.366.024-.551v-.005c.012-.185.024-.373.039-.558.012-.155.027-.311.049-.467s.037-.316.057-.469c.024-.19.054-.382.084-.57.005-.034.01-.067.015-.1s.01-.069.015-.1.022-.1.03-.148c.024-.136.052-.276.079-.412s.054-.26.082-.39l.054-.237c.024-.109.052-.218.079-.324.054-.218.112-.433.175-.649,0,0,0-.01,0-.012.052-.173.1-.345.158-.518.128-.393.264-.785.412-1.166.067-.17.136-.336.205-.5.082-.205.173-.409.267-.609.052-.109.1-.218.155-.326q.341-.708.733-1.381c.067-.116.136-.23.205-.345.139-.23.284-.457.433-.679.076-.112.151-.224.227-.333s.155-.218.233-.326.158-.215.239-.321c.257-.339.524-.669.8-.987a20.122,20.122,0,0,1,8.624-5.845C14.05.9,14.6.736,15.159.6c.131-.03.261-.064.39-.094.264-.057.526-.116.79-.163.133-.024.267-.049.4-.069.116-.022.23-.039.348-.054.3-.045.6-.082.906-.116.155-.015.309-.027.464-.039.185-.015.373-.027.56-.033.16-.01.324-.015.488-.022S19.834,0,20,0c.143,0,.282,0,.424.005.124,0,.245.005.37.01.034,0,.067.005.1.005.321.015.642.039.966.069.131.012.264.024.393.039h.005c.173.018.343.039.516.064.218.03.433.064.652.1.143.024.284.049.424.079s.282.054.422.084c.276.061.555.128.827.2s.53.143.788.222c.116.034.227.069.339.106.042.015.084.027.124.042.1.033.205.069.309.106.178.064.358.128.536.2.242.091.482.185.718.288l.227.1c.227.1.454.205.676.316.146.069.288.139.43.212l.306.161.3.166c.2.116.4.23.593.348l.291.182.284.185.284.19c.188.131.373.26.558.4.091.067.182.133.272.2.178.136.358.279.533.422.088.072.173.146.261.218s.173.146.257.222c.339.3.669.605.987.924a19.467,19.467,0,0,1,1.314,1.454,20.2,20.2,0,0,1,3.681,6.884c.064.212.124.427.182.642.027.112.057.222.084.331q.082.333.155.669c.022.112.045.224.067.336l.064.336c.03.175.061.348.084.524.022.136.039.272.057.409s.037.291.052.437a.6.6,0,0,0,.005.067c.015.16.03.321.042.484a.138.138,0,0,1,0,.033c.024.321.042.642.049.97.01.2.012.393.01.59Z"
              transform="translate(-19252.02 -4725)"
              fill="url(#linear-gradient)"
            />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
