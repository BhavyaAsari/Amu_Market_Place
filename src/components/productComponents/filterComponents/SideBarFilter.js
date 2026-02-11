import FilterSection from "./filterSection"
import BrandFilter from "./SpecFilter/BrandFilter"
import RamFilter from "./SpecFilter/RamFilter"
import Closebutton from "./closeButton"
import StorageFilter from "./SpecFilter/StorageFilter"
import ProcessorFilter from "./SpecFilter/ProcessorFilter"
import PriceFilter from "./priceFilter"


export default function SideBarFilter({ meta }) {
  return (
    <aside
      className="
        hidden md:flex
        flex-col
        w-64
        shrink-0
        shadiw-xl
        rounded-xl
        sticky top-20
        hover:cursor-pointer
        h-[calc(100vh-5rem)]
      "
    >
      {/* Fixed Header */}
      <div className="p-4 border-b">
        <h2 className="text-4xl font-semibold">Filters</h2>
        <Closebutton  />
      </div>

      {/* Scrollable Filters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <PriceFilter />

        <FilterSection title="Brand">
          <BrandFilter brands={meta.brands} />
        </FilterSection>

        <FilterSection title="Ram">
          <RamFilter rams={meta.rams} />
        </FilterSection>

        <FilterSection title="Storage">
          <StorageFilter storages={meta.storages} />
        </FilterSection>

        <FilterSection title="Processor">
          <ProcessorFilter processors={meta.processors} />
        </FilterSection>
      </div>
    </aside>
  );
}
