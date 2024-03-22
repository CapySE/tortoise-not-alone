import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { type HostDetail } from "./type";
import { api } from "@/trpc/react";

export default function ReviewDetails(props: HostDetail) {
  const { data } = api.review.getReviewsNumber.useQuery({
    hostID: props.hostID,
  });
  if (!data) {
    console.log("Error to get review number");
    return;
  }
  const five = data[0] ?? {
    ratingScore: 5,
    count: 0,
  };
  const four = data[1] ?? {
    ratingScore: 4,
    count: 0,
  };
  const three = data[2] ?? {
    ratingScore: 3,
    count: 0,
  };
  const two = data[3] ?? {
    ratingScore: 2,
    count: 0,
  };
  const one = data[4] ?? {
    ratingScore: 1,
    count: 0,
  };
  const sumReviews =
    one.count + two.count + three.count + four.count + five.count;
  const w1 = !sumReviews ? 0 : ((one.count * 243) / sumReviews).toString();
  const w2 = !sumReviews ? 0 : ((two.count * 243) / sumReviews).toString();
  const w3 = !sumReviews ? 0 : ((three.count * 243) / sumReviews).toString();
  const w4 = !sumReviews ? 0 : ((four.count * 243) / sumReviews).toString();
  const w5 = !sumReviews ? 0 : ((five.count * 243) / sumReviews).toString();
  console.log(w1, w2, w3, w4, w5);
  return (
    <div className="flex h-full min-w-[323px] flex-col items-center gap-4 rounded-xl bg-neutral-50 px-5 py-10 ">
      <Image
        className="aspect-square items-center justify-center rounded-full"
        src={props.image ?? ""}
        width={100}
        height={100}
        alt="profilePic"
      />
      <div className="flex w-full flex-col gap-6">
        <div className="h2 flex h-9 items-center justify-center font-bold text-high">
          {props.username}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="h3 font-bold">{props.rating ?? 0.0}</div>
            <div className="h6">/ 5</div>
          </div>
          <StarMaker rating={props.rating ?? 0} />
          <div className="h5 text-medium">Base on {sumReviews} reviews</div>
        </div>
        <div className="flex flex-col  items-center gap-2">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">5</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w5}px` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{five.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">4</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w4}px` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{four.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">3</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w3}px` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{three.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">2</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w2}px` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{two.count}</div>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="h4 text-medium">1</div>
            <div className="flex-grow">
              <hr
                style={{ width: `${w1}px` }}
                className={`h-4 justify-self-start rounded-sm bg-pending`}
              />
            </div>
            <div className="h4 text-medium">{one.count}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StarMaker(props: { rating: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div key={index}>
              <FontAwesomeIcon
                icon={faStar}
                className={`h-6 w-6 pr-1 ${index <= props.rating - 1 ? "text-pending" : "text-neutral-200"}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
