import { Grid, Typography, Box } from "@mui/material";
import styles from "./About.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function About() {
  return (
    <div className={cx("container")}>
      <div className={cx("img-container")}>
        <div className={cx("background-img")}></div>

        <Box
          sx={{
            position: "absolute",
            padding: "0 60px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -56%)",
            zIndex: "100",
            color: "white",
            width: "80%",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "var(--yellow)",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  How it started
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "16px",
                    fontFamily: "var(--font-family)",
                  }}
                >
                  OUR DREAM IS HELPING PEOPLE BUY THE HOUSE THEY WANT
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.8, textAlign: "justify" }}
                >
                  We embarked on this incredible journey with a clear and
                  heartfelt mission: to turn dreams into reality by helping
                  individuals and families find the perfect place to call home.
                  From the very beginning, our passion has been rooted in the
                  belief that everyone deserves a home where they can build a
                  future, create memories, and feel a sense of belonging.
                  Through unwavering dedication and a commitment to excellence,
                  we have worked tirelessly to simplify the process of buying,
                  selling, and finding properties. Over the years, our efforts
                  have allowed us to grow from a small, dedicated team into a
                  vast global network. This network has become a trusted
                  resource for connecting people from all walks of life with
                  homes that match their aspirations, lifestyles, and needs. Our
                  mission extends beyond just real estate transactions; it’s
                  about building relationships and fostering trust. Whether it’s
                  a first-time buyer searching for a starter home or a family
                  looking for their forever place, we strive to provide
                  guidance, expertise, and care every step of the way. Today, we
                  take pride in being more than just a real estate service—we
                  are a partner in helping people achieve their dreams of
                  homeownership and building a brighter future.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src="https://www.mvrdv.com/media/uploads/160329_Visualisierung-Quartiersplatz(1).jpg"
                  alt="Real Estate Statistics"
                  sx={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "24px",
                  }}
                />
                {/* Thống kê */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default About;
