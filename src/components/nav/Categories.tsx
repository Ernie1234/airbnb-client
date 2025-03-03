import { categoriesData } from "@/lib/contants";
import Container from "../shared/Container";
import { CategoryBox } from "./CategoryBox";

export const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categoriesData.map((cat) => (
          <CategoryBox
            key={cat.label}
            label={cat.label}
            desc={cat.desc}
            icon={cat.icon}
          />
        ))}
      </div>
    </Container>
  );
};
