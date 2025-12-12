import { Row, Tab, Tabs } from "react-bootstrap";
import Spinner from "../../components/layout/spinner";
import { useGetEpisodesList } from "../../hooks/queries/media";
import { useEffect, useState } from "react";
import { routeUrls } from "../../libs/route";
import { Link } from "react-router-dom";

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

  if (!data) return <>Error</>;

  return (
    <Tabs id="season-tabs" activeKey={activeKey}>
      {data.map((season) => (
        <Tab eventKey={season.season} title={season.season}>
          {season.episodes.map((episode) => (
            <Row>
              <div className="d-flex gap-1">
                <Link
                  to={routeUrls.media.replace(":id", episode.id)}
                  style={{
                    marginBottom: "5px",
                    fontWeight: "500",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {episode.title}
                </Link>
                <span
                  style={{ fontWeight: "400", color: "grey" }}
                >{`Ep${episode.episodeNumber}`}</span>
              </div>
              <p style={{ fontSize: "14px" }}>{episode.plot}</p>
            </Row>
          ))}
        </Tab>
      ))}
    </Tabs>
  );
};

export default MediaEpisodes;
