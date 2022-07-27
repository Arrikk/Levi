import React, { SVGProps } from 'react'
import Image from 'next/image';

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    withIcon?: Boolean
    src: HTMLImageElement
    elem?: HTMLElement,
    className: String
}

const Avatar = ({ src, withIcon, Icon, elem, className }: Props) => {
    return (
        <div className={`relative  ${className?className:"w-14 h-14"}`}>
            <Image className="rounded-full" width={55} height={55} src={src} />
            {
                withIcon && (
                    <div className={`absolute bottom-0 ${elem ? "p-[1px] " : "p-1"} right-0 border-2 border-white rounded-full bg-slate-50 `}>
                        {
                            Icon && <Icon className="h-3 w-3 text-leviplatte " />
                        }
                        {
                            elem && elem
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Avatar