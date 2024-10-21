import React, { useRef, useEffect } from 'react';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib'; // Correct import of Transformer

interface MarkmapProps {
  content: string; // The markdown content for visualization
}

export default function MarkmapHooks({ content }: MarkmapProps) {
  const refSvg = useRef<SVGSVGElement>(null); // Reference for the SVG element
  const refMm = useRef<Markmap | null>(null); // Reference for the Markmap instance

  useEffect(() => {
    // Only create Markmap if the SVG reference is valid (not null)
    if (refSvg.current && !refMm.current) {
      refMm.current = Markmap.create(refSvg.current); // Initialize Markmap instance
    }

    if (refMm.current) {
      const transformer = new Transformer(); // Correctly instantiate Transformer
      const { root } = transformer.transform(content); // Transform the markdown content
      refMm.current.setData(root); // Set data on the Markmap instance
      refMm.current.fit(); // Adjust the map to fit the SVG container
    }
  }, [content]); // Re-run effect when content changes

  return (
    <svg ref={refSvg} style={{ width: '100%', height: '500px' }} />
  );
}
