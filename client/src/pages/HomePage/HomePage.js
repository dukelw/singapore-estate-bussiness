import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { Button } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function HomePagePage() {
  useEffect(() => {
    const backgroundImage = document.querySelector(".background-img");

    const handleScroll = () => {
      if (backgroundImage) {
        var position =
          backgroundImage.getBoundingClientRect().top - window.scrollY;
        backgroundImage.style.backgroundPosition = `50% -${position / 3}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("img-container")}>
        <div className={cx("background-img")}></div>
        <div className={cx("introduction")}>
          <h1>SINGAPORE PREMIUM MIXED-USE DEVELOPMENT</h1>
          <h2>WITH UNPARALLELED URBAN LIVING EXPERIENCE</h2>
          <div>
            <Button
              sx={{
                borderRadius: "25px",
                border: "2px solid white",
                color: "white",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                minWidth: "200px",
                margin: "0 8px",
              }}
            >
              <Link to={"/appraisal"}>Home appraisal</Link>
            </Button>
            <Button
              sx={{
                borderRadius: "25px",
                border: "2px solid white",
                color: "white",
                backgroundColor: "transparent",
                minWidth: "200px",
                margin: "0 8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <Link to={"/properties"}>Price list</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className={cx("section")}>
        <div className={cx("quote")}>
          <h2 className={cx("section-title")}>Welcome to Future Estate</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src="https://res.cloudinary.com/lewisshop/image/upload/v1735186891/estate_razw16.jpg"
                alt=""
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="https://unionsquareresidencesg.com/wp-content/uploads/sites/5/2024/10/58666237-113c-409d-bed0-cdff108229a8-1-e1730281448941.jpg"
                alt=""
              />
            </Grid>
          </Grid>
          <h2>
            For those who seek an exceptional home and life, there is only
            Future Estate.
          </h2>
          <p>
            Built on centuries of tradition and dedicated to innovating the
            luxury real estate industry, Sotheby's International Realty offers
            transformative experiences through a global network of exceptional
            agents.
          </p>
        </div>
      </div>
      <div className={cx("section", "dark")}>
        <div className={cx("about")}>
          <h2 className={cx("section-title")}>About</h2>
          <img
            src="https://res.cloudinary.com/lewisshop/image/upload/v1735186891/estate_razw16.jpg"
            alt=""
          />
          <Grid sx={{ margin: "40px 0" }} container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography
                sx={{ fontFamily: "var(--font-family)" }}
                variant="h2"
                align="center"
              >
                1,110
              </Typography>
              <Typography variant="body1" align="center">
                Offices Worldwide
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                sx={{ fontFamily: "var(--font-family)" }}
                variant="h2"
                align="center"
              >
                83
              </Typography>
              <Typography variant="body1" align="center">
                Countries & Territories
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                sx={{ fontFamily: "var(--font-family)" }}
                variant="h2"
                align="center"
              >
                26,400
              </Typography>
              <Typography variant="body1" align="center">
                Sales Associates
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography
                sx={{ fontFamily: "var(--font-family)" }}
                variant="h2"
                align="center"
              >
                $143B
              </Typography>
              <Typography variant="body1" align="center">
                Annual Sales (USD)
              </Typography>
            </Grid>
          </Grid>
          <p>
            Only one network of agents represents the longest standing
            tastemaker in the world. In the spirit of innovation, an exceptional
            luxury real estate company bearing the Sotheby’s name was launched
            in 1976. Beyond the beautiful properties and the personal touch of
            our agents, only one brand can deliver a lifestyle that caters to
            you. With a network of homes for sale worldwide, our website lets
            you search property listings globally, and includes a large
            inventory of luxury homes for sale, including houses, condos,
            townhomes, villas, and more.
          </p>
        </div>
      </div>
      <div className={cx("section")}>
        <div className={cx("about")}>
          <h2 className={cx("section-title")}>Agents</h2>
          <img
            src="https://res.cloudinary.com/lewisshop/image/upload/v1735186891/estate_razw16.jpg"
            alt=""
          />
          <p>
            With experts in every part of the world, we are local everywhere,
            allowing us to walk alongside our clients at every stage of their
            journey. With innovative technology and unrivaled service, we ensure
            that your home is connected with buyers, locally and worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}
export default HomePagePage;
