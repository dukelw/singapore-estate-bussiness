import { Grid, Typography, Box } from "@mui/material";
import styles from "./Agents.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Agents() {
  return (
    <div className={cx("container")}>
      {/* Hero Section */}
      <div className={cx("img-container")}>
        <div className={cx("background-img")}></div>
        <Box
          sx={{
            position: "absolute",
            padding: "0 60px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            zIndex: "100",
            color: "white",
            width: "80%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "16px",
              fontFamily: "var(--font-family)",
            }}
          >
            Meet Our Executive Team
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", fontFamily: "var(--font-family)" }}
          >
            Our management team is dedicated to shaping the future of real
            estate by providing leadership, vision, and excellence. With years
            of experience, they are committed to driving success and creating
            value for our clients, partners, and communities worldwide.
          </Typography>

          {/* Executive Team Section */}
          <Box sx={{ padding: "40px 20px" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "40px",
                fontFamily: "var(--font-family)",
              }}
            >
              Our Leadership
            </Typography>
            <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
              {/* Member 1 */}
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    textAlign: "center",
                    padding: "20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="https://file.coinexstatic.com/2023-11-03/00AAA896B058F8834327A5F2FE3FC9B4.png"
                    alt="John Doe"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "16px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "8px",
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                    }}
                  >
                    John Doe
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    Chief Executive Officer
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "12px",
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                      flexGrow: 1,
                    }}
                  >
                    John leads our team with over 20 years of experience in the
                    real estate industry, ensuring innovation and growth in
                    every project.
                  </Typography>
                </Box>
              </Grid>

              {/* Member 2 */}
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    textAlign: "center",
                    padding: "20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="https://play-lh.googleusercontent.com/7coSeFzQQz28lZY6QqfmPPsFPS6udIOYjHxaIEfCFVumCqOj5s5Xxq-0yPiwap_R6A=w240-h480-rw"
                    alt="Jane Smith"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "16px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "8px",
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                    }}
                  >
                    Jane Smith
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    Chief Marketing Officer
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "12px",
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                      flexGrow: 1,
                    }}
                  >
                    Jane oversees marketing strategies, bringing creative
                    insights to enhance our brand and reach across the globe.
                  </Typography>
                </Box>
              </Grid>

              {/* Member 3 */}
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    textAlign: "center",
                    padding: "20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src="https://pbs.twimg.com/profile_images/1752515582665068544/3UsnVSp5_400x400.jpg"
                    alt="Lewis Luther"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "16px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "8px",
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                    }}
                  >
                    Lewis Luther
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#555",
                      fontFamily: "var(--font-family)",
                    }}
                  >
                    Chief Operations Officer
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "12px",
                      fontFamily: "var(--font-family)",
                      color: "var(--black)",
                      flexGrow: 1,
                    }}
                  >
                    Lewis ensures our operations run smoothly, supporting
                    clients and partners with a focus on quality and innovation.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Agents;
