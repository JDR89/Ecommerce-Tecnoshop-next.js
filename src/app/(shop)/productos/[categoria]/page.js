import { MenuCategorias } from "@/components/productos/MenuCategorias";

import { ProductList } from "@/components/productos/ProductList";
import { Suspense } from "react";

export async function generateMetadata({params}) {
  const {categoria}=params
  return {
    title: `TecnoShop - ${categoria}`
  }
}

export function generateStaticParams() {
  return [
    {categoria: "todo"},
  ]
}




export default async function ProductosPage({params}) {
  const {categoria}=params

  try{
    const resp = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/productos/${categoria}`,{
      cache: "no-store"
    });
    const products = await resp.json();

    return (
      <div>
        <div>
          <div
            className="hero h-[10rem] lg:h-[18rem] mb-6 "
            style={{
              backgroundImage:
                "url(https://resource.logitech.com/w_1800,h_1800,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/static-hpb/casa-hpb-desktop.jpg?v=1)",
            }}
          >
            <div className="">
              <h1 className="text-3xl lg:text-6xl font-bold text-warning-content capitalize">
                {
                  (categoria === "todo") ? "Productos" : categoria
                }
              </h1>
            </div>
          </div>
        </div>
  
            
        <MenuCategorias />
  
                <Suspense fallback={<div>Loading...</div>}>
                
                    <ProductList products={products} />  
                  
                   
                </Suspense>
        
      </div>
    );
  } catch (error) { 
    console.log(error,"error al cargar los datos")
    return <div>Error al cargar los datos</div>;
  }
  }
  

  

  

