import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../../../components/layout/spinner";
import { useGetEpisodesList } from "../../../hooks/queries/media";
import { routeUrls } from "../../../libs/route";
import ErrorComponent from "../../../components/layout/error-component";

const MediaEpisodes = ({ id }) => {
  const [activeKey, setActiveKey] = useState("");

  const { data, isLoading } = useGetEpisodesList(id);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveKey(data[0].id);
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  if (!data) return <ErrorComponent />;

  return (
    <Row className="justify-content-center episode-tab custom-tab">
      <Tabs id="season-tabs" activeKey={activeKey}>
        {data.map((season) => (
          <Tab eventKey={season.season} title={`Season ${season.season}`}>
            <SeasonEpisodeList season={season} />
          </Tab>
        ))}
      </Tabs>
    </Row>
  );
};

const SeasonEpisodeList = ({ season }) => {
  return (
    <div className="episode-tab-content" key={season.seasonNumber}>
      {season.episodes.map((episode) => (
        <Link
          to={routeUrls.media.replace(":id", episode.id)}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Card
            style={{
              padding: "8px",
              height: "100%",
            }}
          >
            <CardBody>
              <div
                style={{
                  width: "fit-content",
                  borderRadius: "12px",
                  fontSize: "12px",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  padding: "2px 4px",
                }}
              >{`Episode ${episode.episodeNumber}`}</div>
              <CardTitle>{episode.title}</CardTitle>
              <p style={{ fontSize: "14px" }}>{episode.plot}</p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default MediaEpisodes;
